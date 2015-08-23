package config

import (
	"net/http"

	"github.com/gorilla/mux"

	"../middleware"
)

// Router Define the router delegation.
type Router struct{}

// Logger - loaded middleware.
var Logger = middleware.Logger{}

// NewRouter overrides the mux.Router NewRouter functionality.
func (c Router) NewRouter() *mux.Router {
	router := mux.NewRouter().StrictSlash(true)
	for _, route := range routes {
		var handler http.Handler

		handler = route.HandlerFunc
		handler = Logger.Handle(handler, route.Name)

		router.
			Methods(route.Method).
			Path(route.Pattern).
			Name(route.Name).
			Handler(handler)
	}

	router.PathPrefix("/").Handler(http.FileServer(http.Dir("./public/")))

	return router
}
