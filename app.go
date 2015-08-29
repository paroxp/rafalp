package main

import (
	"log"
	"net/http"

	"rafalp.com/config"
)

func main() {
	config.Router{}.NewRouter()

	log.Println("Listening...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
