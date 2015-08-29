package model

import "time"

// Contact defines the entries submited from the frontend.
type Contact struct {
	ID        int        `db:"id",json:"id"`
	Name      string     `db:"name",json:"name"`
	Email     string     `db:"email",json:"email"`
	Message   string     `db:"message",json:"message"`
	CreatedAt time.Time  `db:"created_at",json:"created_at"`
	UpdatedAt time.Time  `db:"updated_at",json:"-"`
	DeletedAt *time.Time `db:"deleted_at",json:"-"`
}
