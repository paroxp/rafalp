package main

import (
	"os"

	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

func cleanup() {
	_ = os.Remove("test/public/test.html")
	_ = os.Remove("test/test.fail")
	_ = os.Remove("test/test.html")
	_ = os.Remove("test/test.txt")
	_ = os.Remove("test/tmp/1.txt")
	_ = os.Remove("test/tmp/3.txt")
	_ = os.Remove("test/tmp/test.css")
}

var _ = Describe("Main", func() {
	AfterEach(cleanup)

	It("should prepareContent()", func() {
		err := prepareContent("test/content/test.yml")

		Expect(err).ShouldNot(HaveOccurred())

		_, err = os.Stat("test/public/test.html")
		Expect(err).ShouldNot(HaveOccurred())
	})

	It("should fail to prepareContent() due to bad pattern", func() {
		err := prepareContent("[]a]")

		Expect(err).Should(HaveOccurred())

		_, err = os.Stat("test/public/test.html")
		Expect(err).Should(HaveOccurred())
	})

	It("should fail to prepareContent() due to incorrect syntax", func() {
		err := prepareContent("test/fail.yml")

		Expect(err).Should(HaveOccurred())

		_, err = os.Stat("test/public/test.html")
		Expect(err).Should(HaveOccurred())
	})

	It("should fail to prepareContent() due to incorrect file", func() {
		err := prepareContent("test/content/missing-template.yml")

		Expect(err).Should(HaveOccurred())

		_, err = os.Stat("test/public/test.html")
		Expect(err).Should(HaveOccurred())
	})

	Context("copy functionality", func() {
		AfterEach(cleanup)

		It("should copyFiles() successfully", func() {
			c := []copy{
				copy{Source: "test/copy/*.txt", Destination: "test/tmp"},
			}

			err := copyFiles(c)

			Expect(err).ShouldNot(HaveOccurred())
		})

		It("should fail to copyFiles() due to syntax error in source", func() {
			c := []copy{
				copy{Source: "[]", Destination: "test/tmp"},
			}

			err := copyFiles(c)

			Expect(err).Should(HaveOccurred())
		})
	})

	Context("sass functionality", func() {
		var s sass
		var c sassCompile

		BeforeEach(func() {
			c = sassCompile{
				Name:   "test",
				Input:  "test/scss/test.scss",
				Output: "test/tmp/test.css",
			}

			s = sass{
				Compile: []sassCompile{c},
			}
		})

		AfterEach(cleanup)

		It("should compileSass() successfully", func() {
			err := compileSass(s)

			Expect(err).ShouldNot(HaveOccurred())

			By("compiling successfully, we'd like to be sure it kept unicode string")

			css, err := loadFile(s.Compile[0].Output)

			Expect(err).ShouldNot(HaveOccurred())
			Expect(string(css)).To(ContainSubstring("p span"))
		})

		It("should fail to compileSass() due to invalid input file", func() {
			s.Compile[0].Input = "/etc/not_gonna_happen.ever"
			err := compileSass(s)

			Expect(err).Should(HaveOccurred())
		})

		It("should fail to compileSass() due to lack of permissions", func() {
			s.Compile[0].Output = "/etc/asda"
			err := compileSass(s)

			Expect(err).Should(HaveOccurred())
		})

		It("should fail to compileSass() due to wrong syntax", func() {
			s.Compile[0].Input = "test/copy/1.txt"
			err := compileSass(s)

			Expect(err).Should(HaveOccurred())
		})
	})

	Describe("run", func() {
		var cfg config

		BeforeEach(func() {
			cfg = config{
				Author:      "John Smith",
				Copyright:   "John Smith 1971",
				Content:     "test/content/test.yml",
				Description: "Little compiler.",
				Keywords:    "all, the, key, words",
				Name:        "This should be title, but whatever...",
				Version:     "1.2.3",
				Inline: map[string]string{
					"json": "test/copy/2.json",
				},
				SASS: sass{
					IncludePaths: []string{},
					Compile: []sassCompile{
						sassCompile{
							Name:   "test",
							Input:  "test/scss/test.scss",
							Output: "test/tmp/test.css",
						},
					},
				},
				Copy: []copy{
					copy{
						Name:        "test",
						Source:      "test/copy/*.txt",
						Destination: "test/tmp",
						Override:    false,
					},
				},
			}
		})

		AfterEach(cleanup)

		It("should run() successfully", func() {
			err := run(&cfg)

			Expect(err).ShouldNot(HaveOccurred())
		})

		It("should fail to run() due to invalid copy syntax", func() {
			cfg.Copy[0].Source = "[]"

			err := run(&cfg)

			Expect(err).Should(HaveOccurred())
		})

		It("should fail to run() due to invalid sass syntax", func() {
			cfg.SASS.Compile[0].Input = "test/copy/1.txt"

			err := run(&cfg)

			Expect(err).Should(HaveOccurred())
		})

		It("should fail to run() due to invalid content syntax", func() {
			cfg.Content = "[]"

			err := run(&cfg)

			Expect(err).Should(HaveOccurred())
		})
	})
})
