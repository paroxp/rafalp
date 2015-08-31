package handler

import (
	"encoding/json"
	"net/http"
	"text/template"

	"github.com/gorilla/context"
	"github.com/jmoiron/sqlx"
	"github.com/mailgun/mailgun-go"
	"rafalp.com/model"
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
	contact := model.Contact{
		Db:      context.Get(r, "db").(*sqlx.DB),
		Mailgun: context.Get(r, "mailgun").(mailgun.Mailgun),

		Name:    r.FormValue("name"),
		Email:   r.FormValue("email"),
		Message: r.FormValue("message"),
		URL:     r.FormValue("url"),
	}

	contact, err := contact.Create()

	if err != nil {
		panic(err)
	} else {
		mg := context.Get(r, "mailgun").(mailgun.Mailgun)
		message := mg.NewMessage(
			"Obi-Wan Kenobi <server@rafalp.com>",
			"New message from "+contact.Name,
			contact.Message,
			"Rafał Proszowski <paroxp@gmail.com>",
		)

		// Just in case we will need it some time in the future, its:
		// _, id, err := mg.Send(message)
		_, _, err := mg.Send(message)

		if err != nil {
			panic(err)
		}
	}

	// Compose the JSON response.
	js, err := json.Marshal(contact)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(js)

	return
}
