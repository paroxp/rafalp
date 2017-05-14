package main

import (
	"io/ioutil"
	"os"

	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

var _ = Describe("Page", func() {
	var (
		p *page
	)

	AfterEach(cleanup)

	It("should create newPage()", func() {
		var err error
		p, err = newPage("content/404.yml")

		Expect(err).ShouldNot(HaveOccurred())
		Expect(p).NotTo(BeNil())
		Expect(p.Slug).To(Equal("404"))
	})

	It("should create newPage() with custom path", func() {
		pg, err := newPage("test/path.yml")

		Expect(err).ShouldNot(HaveOccurred())
		Expect(pg).NotTo(BeNil())
		Expect(pg.Path).To(Equal("test/test.html"))
	})

	It("should fail to create newPage() due to missing file", func() {
		pg, err := newPage("not_gonna_happen.ever")

		Expect(err).To(HaveOccurred())
		Expect(err.Error()).To(ContainSubstring("no such file or directory"))
		Expect(pg).To(BeNil())
	})

	It("should fail to create newPage() due to invalid syntax", func() {
		pg, err := newPage("test/fail.yml")

		Expect(err).To(HaveOccurred())
		Expect(pg).To(BeNil())
	})

	It("should fail to create newPage() due to missing slug", func() {
		pg, err := newPage("test/no-slug.yml")

		Expect(err).To(HaveOccurred())
		Expect(pg).To(BeNil())
	})

	It("should compile() the page", func() {
		p.Template, p.Path = "default.html", "test/test.html"
		err := p.compile()
		Expect(err).ShouldNot(HaveOccurred())

		_, err = os.Stat("test/test.html")
		Expect(err).ShouldNot(HaveOccurred())
	})

	It("should fail to compile() the page due to missing templateFile", func() {
		p.Template, p.Path = "not_gonna_happen.ever", "test/test.html"
		err := p.compile()
		Expect(err).Should(HaveOccurred())

		_, err = os.Stat("test/test.html")
		Expect(err).Should(HaveOccurred())
	})

	It("should fail to compile() the page due to faulty execution", func() {
		_ = ioutil.WriteFile("test/test.fail", make([]byte, 0), 0444)

		p.Template, p.Path = "default.html", "test/test.fail"
		err := p.compile()
		Expect(err).Should(HaveOccurred())
	})

	It("should fail to compile() the page due to faulty execution", func() {
		_ = ioutil.WriteFile("test/test.fail", make([]byte, 0), 0444)

		p.Template, p.Path = "../../test/path.yml", "test/test.fail"
		err := p.compile()
		Expect(err).Should(HaveOccurred())
	})

	It("should return destination() string", func() {
		pg := page{Slug: "test"}
		path, err := pg.destination()

		Expect(err).ShouldNot(HaveOccurred())
		Expect(*path).To(Equal("public/test.html"))
	})

	It("should fail to return destination() string due to lack of slug", func() {
		pg := page{}
		path, err := pg.destination()

		Expect(err).Should(HaveOccurred())
		Expect(path).To(BeNil())
	})

	It("should prepare the page withConfig()", func() {
		c := config{Name: "test-case"}

		Expect(p.Config.Name).NotTo(Equal("test-case"))

		p.withConfig(&c)

		Expect(p.Config.Name).To(Equal("test-case"))
	})

	It("should prepareHTML() from markdown", func() {
		s := []skills{
			skills{Description: "## Test 2"},
			skills{Description: "### Test 3"},
		}
		p.Content = "# Test"
		p.Skills = s

		p.prepareHTML()

		Expect(p.Body).NotTo(BeNil())
		Expect(p.Body).To(ContainSubstring("<h1>Test</h1>"))

		Expect(p.Skills[0].Body).NotTo(BeNil())
		Expect(p.Skills[0].Body).To(ContainSubstring("<h2>Test 2</h2>"))

		Expect(p.Skills[1].Body).NotTo(BeNil())
		Expect(p.Skills[1].Body).To(ContainSubstring("<h3>Test 3</h3>"))
	})
})
