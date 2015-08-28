package handler

import (
	"log"
	"net/http"
	"text/template"

	"github.com/gorilla/context"
)

// Home defines the default handler.
type Home struct{}

// Index prints out the default route for the web application.
func (h Home) Index(w http.ResponseWriter, r *http.Request) {
	log.Print(context.Get(r, "config"))
	t := template.New("Home.Index")
	t, _ = template.ParseFiles("./view/layout/master.html", "./view/home/index.html")

	t.Execute(w, nil)
}

// PostContact recieve the post request and convert it into the message.
func (h Home) PostContact(w http.ResponseWriter, r *http.Request) {

}
