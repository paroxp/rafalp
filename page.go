package main

import (
	"bytes"
	"errors"
	"fmt"
	"text/template"
	"time"

	"github.com/russross/blackfriday"

	yaml "gopkg.in/yaml.v2"
)

type skills struct {
	Body        string
	Description string `yaml:"description"`
	Name        string `yaml:"name"`
	Score       int64  `yaml:"score"`
}

type page struct {
	Config config

	Body      string
	Class     string    `yaml:"class"`
	Content   string    `yaml:"content"`
	CreatedAt time.Time `yaml:"created_at"`
	Path      string    `yaml:"path"`
	Skills    []skills  `yaml:"skills"`
	Slug      string    `yaml:"slug"`
	Template  string    `yaml:"template"`
	Title     string    `yaml:"title"`
	UpdatedAt time.Time `yaml:"updates_at"`
}

func (p *page) compile() error {
	templateFile := fmt.Sprintf("templates/page/%s", p.Template)
	t, err := template.ParseFiles("templates/master.html", templateFile)
	if err != nil {
		return err
	}

	p.prepareHTML()

	var content bytes.Buffer
	err = t.Execute(&content, p)
	if err != nil {
		return err
	}

	err = createFile(p.Path, content)
	if err != nil {
		return err
	}

	return nil
}

func (p *page) destination() (*string, error) {
	if p.Slug == "" {
		return nil, errors.New("page: no slug provided")
	}

	path := fmt.Sprintf("public/%s.html", p.Slug)

	return &path, nil
}

func (p *page) withConfig(c *config) {
	if c != nil {
		p.Config = *c
	}
}

func (p *page) prepareHTML() {
	body := blackfriday.MarkdownCommon([]byte(p.Content))
	p.Body = string(body)

	for i, skill := range p.Skills {
		skillBody := blackfriday.MarkdownCommon([]byte(skill.Description))
		p.Skills[i].Body = string(skillBody)
	}
}

func newPage(filename string) (*page, error) {
	content, err := loadFile(filename)
	if err != nil {
		return nil, err
	}

	p := page{}

	err = yaml.Unmarshal(content, &p)
	if err != nil {
		return nil, err
	}

	if p.Path == "" {
		path, err := p.destination()
		if err != nil {
			return nil, err
		}

		p.Path = *path
	}

	if p.Template == "" {
		p.Template = "default.html"
	}

	return &p, nil
}
