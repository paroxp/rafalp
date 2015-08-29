package handler

import (
	"net/http"
	"text/template"
)

// Home defines the default handler.
type Home struct{}

// Index prints out the default route for the web application.
func (h Home) Index(w http.ResponseWriter, r *http.Request) {
	t := template.New("Home.Index")
	t, _ = template.ParseFiles("./view/layout/master.html", "./view/home/index.html")

	t.Execute(w, nil)
}

// PostContact recieve the post request and convert it into the message.
func (h Home) PostContact(w http.ResponseWriter, r *http.Request) {

}
