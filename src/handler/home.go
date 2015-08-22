package handler

import (
	"fmt"
	// "github.com/gorilla/mux"
	"net/http"
)

// Home defines the default handler.
type Home struct{}

// Index prints out the default route for the web application.
func (h Home) Index(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome!")
}
