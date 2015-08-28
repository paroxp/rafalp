package middleware

import (
	"net/http"

	"github.com/gorilla/context"
)

// ClearContext - clear the remaining context after the request
func ClearContext() Adapter {
	return func(h http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			defer context.Clear(r)
			h.ServeHTTP(w, r)
		})
	}
}

// SetContext - set specified context for the request.
func SetContext(config interface{}) Adapter {
	return func(h http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			context.Set(r, "config", config)
			h.ServeHTTP(w, r)
		})
	}
}
