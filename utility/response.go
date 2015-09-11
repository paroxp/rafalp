package utility

import (
	"encoding/json"
	"net/http"
)

// Response modification for our application.
type Response struct{}

// JSON will return an object in the browser.
func (r Response) JSON(w http.ResponseWriter, data interface{}, status int) {
	w.Header().
		Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(status)

	if err := json.NewEncoder(w).Encode(data); err != nil {
		panic(err)
	}

	return
}
