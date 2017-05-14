package main

import (
	"bytes"
	"io/ioutil"
	"os"

	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

var _ = Describe("Utils", func() {
	AfterEach(cleanup)

	It("should loadFile()", func() {
		content, err := loadFile("config.yml")

		Expect(err).ShouldNot(HaveOccurred())
		Expect(content).NotTo(BeEmpty())
	})

	It("should fail to loadFile() if one doesn't exist", func() {
		content, err := loadFile("not_gonna_happen.ever")

		Expect(err).To(HaveOccurred())
		Expect(err.Error()).To(ContainSubstring("no such file or directory"))
		Expect(content).To(BeNil())
	})

	It("should createFile()", func() {
		b := bytes.NewBufferString(`test`)
		err := createFile("test/test.txt", *b)

		Expect(err).ShouldNot(HaveOccurred())

		_, err = os.Stat("test/test.txt")
		Expect(err).ShouldNot(HaveOccurred())
	})

	It("should not createFile()", func() {
		_ = ioutil.WriteFile("test/test.fail", make([]byte, 0), 0444)

		b := bytes.NewBufferString(`test`)
		err := createFile("test/test.fail", *b)

		Expect(err).Should(HaveOccurred())
	})
})
