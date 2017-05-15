package main

import (
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

var _ = Describe("Config", func() {
	It("should loadConfig()", func() {
		config, err := loadConfig("config.yml")

		Expect(err).ShouldNot(HaveOccurred())
		Expect(config.Author).To(Equal("Rafal Proszowski"))
	})

	It("should fail to loadConfig() due to missing file", func() {
		config, err := loadConfig("not_gonna_happen.ever")

		Expect(err).Should(HaveOccurred())
		Expect(config).To(BeNil())
	})

	It("should fail to loadConfig() due to missing file", func() {
		config, err := loadConfig("test/fail.yml")

		Expect(err).Should(HaveOccurred())
		Expect(config).To(BeNil())
	})

	It("should fail to loadConfig() due to missing inline file", func() {
		config, err := loadConfig("test/fail-config.yml")

		Expect(err).Should(HaveOccurred())
		Expect(config).To(BeNil())
	})

	Context("copy", func() {
		var c copy

		BeforeEach(func() {
			c = copy{
				Name:        "TestCase",
				Source:      "test/copy/*.txt",
				Destination: "test/tmp",
				Override:    false,
			}
		})

		AfterEach(cleanup)

		It("should glob() all files", func() {
			files, err := c.glob()

			Expect(err).ShouldNot(HaveOccurred())
			Expect(len(files)).To(Equal(2))
			Expect(files[1]).To(Equal("test/copy/3.txt"))
		})

		It("should copy() files sucessfully", func() {
			err := c.copy()

			Expect(err).ShouldNot(HaveOccurred())

			content, err := loadFile("test/tmp/3.txt")

			Expect(err).ShouldNot(HaveOccurred())
			Expect(string(content)).Should(ContainSubstring("a"))
		})

		It("should fail to copy() files due to syntax error in source", func() {
			c.Source = "[]"

			err := c.copy()

			Expect(err).Should(HaveOccurred())
		})

		It("should fail to copy() due to permission error in destination", func() {
			c.Destination = "/etc/asda"

			err := c.copy()

			Expect(err).Should(HaveOccurred())
		})
	})

	Context("sass", func() {
		s := sass{
			IncludePaths: []string{
				"test/copy/1.txt",
			},
		}

		It("should getIncludePaths() with absolute result", func() {
			files, err := s.getIncludePaths()

			Expect(err).ShouldNot(HaveOccurred())
			Expect(files[0]).To(ContainSubstring("/test/copy/1.txt"))
		})
	})
})
