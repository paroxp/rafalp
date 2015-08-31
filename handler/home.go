package handler

import (
	"net/http"
	"text/template"

	"github.com/gorilla/context"
	"github.com/jmoiron/sqlx"
	"github.com/mailgun/mailgun-go"
	"rafalp.com/model"
	"rafalp.com/utility"
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

	// Attempt to save an entry.
	contact, errors := contact.Create()

	// Return any validation issues.
	if !errors.Empty() {
		utility.Response{}.
			JSON(w, errors.SetMessage("I'm sorry... We've found some problems with your data..."), http.StatusBadRequest)

		return
	}

	// Send an email.
	_, _, err := contact.Send()

	if err != nil {
		utility.Response{}.
			JSON(w, err, http.StatusTeapot)

		return
	}

	// Return our newly created object.
	utility.Response{}.
		JSON(w, contact, http.StatusCreated)
}
