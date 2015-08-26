package middleware

import (
	"log"
	"net/http"
	"time"
)

// PrintLog will output connection details on request.
func PrintLog() Adapter {
	return func(h http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			start := time.Now()

			h.ServeHTTP(w, r)

			log.Printf(
				"%s\t%s\t%s\t%s",
				r.Method,
				r.RequestURI,
				// name,
				time.Since(start),
			)
		})
	}
}
