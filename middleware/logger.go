package middleware

import (
	"log"
	"net/http"
	"time"
)

// Logger defines a middleware handle for the router.
type Logger struct{}

// Handle wraps the http.Handler in the logging functionality.
func (m Logger) Handle(inner http.Handler, name string) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()

		inner.ServeHTTP(w, r)

		log.Printf(
			"%s\t%s\t%s\t%s",
			r.Method,
			r.RequestURI,
			name,
			time.Since(start),
		)
	})
}
