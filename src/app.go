package main

import (
	"log"
	"net/http"

	"./config"
)

// Router - loaded our configuration router.
var Router = config.Router{}

func main() {
	log.Println("Listening...")

	router := Router.NewRouter()

	log.Fatal(http.ListenAndServe(":8080", router))
}
