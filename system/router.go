package system

import (
	"net/http"

	"github.com/gorilla/mux"
	"rafalp.com/middleware"
)

// Router Define the router delegation.
type Router struct{}

// NewRouter overrides the mux.Router NewRouter functionality.
func (r Router) NewRouter() *mux.Router {
	router := mux.NewRouter()

	for _, route := range routes {
		var handler http.Handler

		handler = route.HandlerFunc

		router.
			Methods(route.Method).
			Path(route.Pattern).
			Name(route.Name).
			Handler(handler)
	}

	// Setup middleware for our system.
	http.Handle("/", middleware.Adapt(router,
		middleware.SetContext(Configuration{}.Read("application")),
		middleware.PrintLog(),
		middleware.SaveConnection(Database{}.Connect()),
		middleware.SetDispatcher(Mail{}.Setup()),
		middleware.ClearContext(),
	))

	// Handle any static files.
	router.PathPrefix("/").Handler(http.FileServer(http.Dir("./public/")))

	return router
}
