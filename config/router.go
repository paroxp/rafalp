package config

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"rafalp.com/middleware"
)

// Router Define the router delegation.
type Router struct{}

// NewRouter overrides the mux.Router NewRouter functionality.
func (c Router) NewRouter() *mux.Router {
	router := mux.NewRouter().StrictSlash(true)

	// Setup middleware for our system.
	http.Handle("/", middleware.Adapt(router,
		middleware.SetContext(Read("config")),
		middleware.PrintLog(),
		middleware.ClearContext(),
	))

	for _, route := range routes {
		var handler http.Handler

		handler = route.HandlerFunc

		router.
			Methods(route.Method).
			Path(route.Pattern).
			Name(route.Name).
			Handler(handler)

		log.Print("Loading the route for: " + route.Name)
	}

	// Handle any static files.
	router.PathPrefix("/").Handler(http.FileServer(http.Dir("./public/")))

	return router
}
