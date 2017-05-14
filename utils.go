package main

import (
	"bytes"
	"io"
	"io/ioutil"
	"os"
)

func createFile(filename string, content bytes.Buffer) error {
	err := ioutil.WriteFile(filename, content.Bytes(), 0644)
	if err != nil {
		return err
	}

	return nil
}

func loadFile(filename string) ([]byte, error) {
	file, err := os.Open(filename)
	if err != nil {
		return nil, err
	}

	buf := bytes.NewBuffer(nil)

	io.Copy(buf, file)
	file.Close()

	return buf.Bytes(), nil
}
