package main

import (
	"log"
	"net/http"

	"rafalp.com/system"
)

func main() {
	system.Router{}.NewRouter()

	log.Println("Listening...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
