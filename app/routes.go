package app

import (
	"net/http"

	"rafalp.com/handler"
)

// Route - define our struct.
type Route struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc http.HandlerFunc
}

// Routes should be a type of the Route struct.
type Routes []Route

// Home handler loaded into the variable.
var Home = handler.Home{}

// routes the list of single Routes.
var routes = Routes{
	Route{
		"Home.Index",
		"GET",
		"/",
		Home.Index,
	},
	Route{
		"Home.Contact",
		"POST",
		"/contact",
		Home.PostContact,
	},
}
