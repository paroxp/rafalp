package main

import (
	"log"
	"net/http"

	"rafalp.com/app"
)

func main() {
	app.Router{}.NewRouter()

	log.Println("Listening...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
