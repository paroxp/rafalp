package middleware

import "net/http"

// Adapter - Set up an adapter for h
type Adapter func(http.Handler) http.Handler

// Adapt - Adapt h with all specified adapters.
func Adapt(h http.Handler, adapters ...Adapter) http.Handler {
	for _, adapter := range adapters {
		h = adapter(h)
	}

	return h
}
