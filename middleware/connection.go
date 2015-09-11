package middleware

import (
	"net/http"

	"github.com/gorilla/context"
)

// SaveConnection save the connection in the context.
func SaveConnection(db interface{}) Adapter {
	return func(h http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			context.Set(r, "db", db)

			h.ServeHTTP(w, r)
		})
	}
}
