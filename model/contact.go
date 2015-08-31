package model

import (
	"time"

	"github.com/jmoiron/sqlx"
	"github.com/mailgun/mailgun-go"
	"rafalp.com/utility"
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
func (c Contact) Create() (Contact, utility.Error) {
	errors := c.Validate()
	if !errors.Empty() {
		return c, errors
	}

	result := c.Db.MustExec("INSERT INTO contact (name, email, message, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW());", c.Name, c.Email, c.Message)

	id, _ := result.LastInsertId()
	object, err := c.Find(id)
	if err != nil {
		errors = errors.Add("insert", err.Error())
	}

	return object, errors
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
	Validator := utility.Validator{}

	validator := Validator.Validate("name",
		Validator.NotEmpty(c.Name, "I'd prefer to know who you are."),
	).Validate("email",
		Validator.NotEmpty(c.Email, "I won't be able to reply to you!"),
		Validator.IsEmail(c.Email, "This email doesn't look right to me..."),
	).Validate("message",
		Validator.NotEmpty(c.Message, "Got nothing to say?"),
		Validator.MinLength(c.Message, 25, "Your message should be at least 25 characters long."),
	).Validate("url",
		Validator.Empty(c.URL, "I see what you did there... I don't like it."),
	)

	return validator.Error
}
