package main

import (
	"fmt"
	"io"
	"os"
	"path/filepath"

	yaml "gopkg.in/yaml.v2"
)

type config struct {
	Author      string            `yaml:"author"`
	Copyright   string            `yaml:"copyright"`
	Content     string            `yaml:"content"`
	Description string            `yaml:"description"`
	Keywords    string            `yaml:"keywords"`
	Name        string            `yaml:"name"`
	Version     string            `yaml:"version"`
	Inline      map[string]string `yaml:"inline"`
	SASS        sass              `yaml:"sass"`
	Copy        []copy            `yaml:"copy"`
}

type copy struct {
	Name        string `yaml:"name"`
	Source      string `yaml:"src"`
	Destination string `yaml:"dest"`
	Override    bool   `yaml:"force"`
}

type sass struct {
	IncludePaths []string      `yaml:"include_paths"`
	Compile      []sassCompile `yaml:"compile"`
}

type sassCompile struct {
	Name   string `yaml:"name"`
	Input  string `yaml:"input"`
	Output string `yaml:"output"`
}

func loadConfig(filename string) (*config, error) {
	c := config{}

	content, err := loadFile(filename)
	if err != nil {
		return nil, err
	}

	err = yaml.Unmarshal(content, &c)
	if err != nil {
		return nil, err
	}

	for key, value := range c.Inline {
		content, err = loadFile(value)
		if err != nil {
			return nil, err
		}

		c.Inline[key] = string(content)
	}

	return &c, nil
}

func (c *copy) copy() error {
	files, err := c.glob()
	if err != nil {
		return err
	}

	for _, file := range files {
		sourceFile, err := os.Open(file)
		if err != nil {
			return err
		}

		defer sourceFile.Close()

		dest := fmt.Sprintf("%s/%s", c.Destination, filepath.Base(sourceFile.Name()))

		destinationFile, err := os.Create(dest)
		if err != nil {
			return err
		}

		defer destinationFile.Close()

		_, err = io.Copy(destinationFile, sourceFile)
		if err == nil {
			fmt.Printf("Copying %s file: `%s` to `%s`\n", c.Name, file, dest)

			sourceInfo, err := os.Stat(file)
			if err != nil {
				err = os.Chmod(dest, sourceInfo.Mode())
				if err != nil {
					return err
				}
			}
		}
	}

	return nil
}

func (c *copy) glob() ([]string, error) {
	return filepath.Glob(c.Source)
}

func (s *sass) getIncludePaths() ([]string, error) {
	var files []string

	for _, file := range s.IncludePaths {
		abs, err := filepath.Abs(file)
		if err != nil {
			return nil, err
		}

		files = append(files, abs)
	}

	return files, nil
}
