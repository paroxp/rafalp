package model

import "time"

// Contact defines the entries submited from the frontend.
type Contact struct {
	ID        int        `json:"id"`
	Name      string     `sql:"type:varchar(255)",json:"name"`
	Email     string     `sql:"type:varchar(255)",json:"email"`
	Message   string     `sql:"type:varchar(1024)",json:"message"`
	CreatedAt time.Time  `json:"created_at"`
	UpdatedAt time.Time  `json:"-"`
	DeletedAt *time.Time `json:"-"`
}
