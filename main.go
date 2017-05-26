package main

import (
	"flag"
	"fmt"
	"log"
	"os"
	"path/filepath"

	libsass "github.com/wellington/go-libsass"
)

var (
	configFile = flag.String("config", "config.yml", "Path to configuration file.")

	cfg *config
)

func compileSass(sassConfig sass) error {
	for _, compile := range sassConfig.Compile {
		fi, err := os.Open(compile.Input)
		if err != nil {
			return err
		}
		defer fi.Close()

		fo, err := os.Create(compile.Output)
		if err != nil {
			return err
		}
		defer fo.Close()

		includePaths, err := sassConfig.getIncludePaths()
		if err != nil {
			return err
		}

		p := libsass.IncludePaths(includePaths)
		s := libsass.OutputStyle(libsass.COMPRESSED_STYLE)

		fmt.Printf("Compiling %s: `%s` into `%s`\n", compile.Name, compile.Input, compile.Output)

		comp, err := libsass.New(fo, fi, p, s)
		if err != nil {
			return err
		}

		if err := comp.Run(); err != nil {
			return err
		}
	}

	return nil
}

func copyFiles(list []copy) error {
	for _, entry := range list {
		err := entry.copy()
		if err != nil {
			return err
		}
	}

	return nil
}

func prepareContent(query string) error {
	files, err := filepath.Glob(query)
	if err != nil {
		return err
	}

	for _, filename := range files {
		p, err := newPage(filename)
		if err != nil {
			return err
		}

		fmt.Printf("Building %s from %s...\n", p.Path, filename)

		p.withConfig(cfg)
		err = p.compile()
		if err != nil {
			return err
		}
	}

	return nil
}

func main() {
	var err error

	flag.Parse()

	cfg, err = loadConfig(*configFile)
	if err != nil {
		log.Fatalln(err)
	}

	err = run(cfg)
	if err != nil {
		log.Fatalln(err)
	}
}

func run(cfg *config) error {
	var err error

	err = copyFiles(cfg.Copy)
	if err != nil {
		return err
	}

	err = compileSass(cfg.SASS)
	if err != nil {
		return err
	}

	err = prepareContent(cfg.Content)
	if err != nil {
		return err
	}

	return nil
}
