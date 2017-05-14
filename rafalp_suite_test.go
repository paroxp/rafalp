package main

import (
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"

	"testing"
)

func TestRafalp(t *testing.T) {
	RegisterFailHandler(Fail)
	RunSpecs(t, "Rafal Proszowski Suite")
}
