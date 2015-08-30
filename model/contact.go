package model

import (
	"time"

	"github.com/jmoiron/sqlx"
)

// Contact defines the entries submited from the frontend.
type Contact struct {
	Db *sqlx.DB `json:"-"`

	ID        int        `db:"id" json:"id"`
	Name      string     `db:"name" json:"name"`
	Email     string     `db:"email" json:"email"`
	Message   string     `db:"message" json:"message"`
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
