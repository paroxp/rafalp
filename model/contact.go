package model

import (
	"regexp"
	"time"
	"unicode/utf8"

	"github.com/jmoiron/sqlx"
	"github.com/mailgun/mailgun-go"
)

// Contact defines the entries submited from the frontend.
type Contact struct {
	Db      *sqlx.DB        `json:"-"`
	Mailgun mailgun.Mailgun `json:"-"`

	ID        int        `db:"id" json:"id"`
	Name      string     `db:"name" json:"name"`
	Email     string     `db:"email" json:"email"`
	Message   string     `db:"message" json:"message"`
	URL       string     `db:"-" json:"-"`
	CreatedAt time.Time  `db:"created_at" json:"created_at"`
	UpdatedAt time.Time  `db:"updated_at" json:"-"`
	DeletedAt *time.Time `db:"deleted_at" json:"-"`
}

// Create will add a new entry to the database.
func (c Contact) Create() (Contact, error) {
	result := c.Db.MustExec("INSERT INTO contact (name, email, message, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW());", c.Name, c.Email, c.Message)

	id, err := result.LastInsertId()
	object, err := c.Find(id)

	return object, err
}

// Find the entry by id.
func (c Contact) Find(id int64) (Contact, error) {
	err := c.Db.Get(&c, "SELECT * FROM contact WHERE id=?", id)

	return c, err
}

// Send an email copy out.
func (c Contact) Send() (string, string, error) {
	message := c.Mailgun.NewMessage(
		"Obi-Wan Kenobi <server@rafalp.com>",
		"New message from "+c.Name,
		c.Message,
		"Rafał Proszowski <paroxp@gmail.com>",
	)

	return c.Mailgun.Send(message)
}

// Validate the model.
func (c Contact) Validate() utility.Error {
	err := utility.Error{}

	// Validate Name field.
	if c.Name == "" {
		err = err.Add("name", "I'd prefer to know who you are.")
	} else if utf8.RuneCountInString(c.Name) < 5 {
		err = err.Add("name", "Surely, your name is longer than 4 characters.")
	}

	// Validate Email field.
	email := regexp.MustCompile(`^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,4}$`)
	if c.Email == "" {
		err = err.Add("email", "I won't be able to reply to you!")
	} else if !email.MatchString(c.Email) {
		err = err.Add("email", "Provided email address is invalid.")
	}

	// Validate Message field.
	if c.Message == "" {
		err = err.Add("message", "Got nothing to say?")
	} else if utf8.RuneCountInString(c.Message) < 26 {
		err = err.Add("message", "Your message should be at least 25 characters long.")
	}

	// Make sure to protect ourselves against the spam...
	if c.URL != "" {
		err = err.Add("url", "I see what you did there... I don't like it.")
	}

	return err
}
