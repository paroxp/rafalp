package middleware

import (
	"net/http"

	"github.com/gorilla/context"
	"github.com/mailgun/mailgun-go"
)

// SetDispatcher - set specified context for the request.
func SetDispatcher(mailgun mailgun.Mailgun) Adapter {
	return func(h http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			context.Set(r, "mailgun", mailgun)
			h.ServeHTTP(w, r)
		})
	}
}
