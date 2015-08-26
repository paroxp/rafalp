package main

import (
	"log"
	"net/http"

	"./config"
)

// Router - loaded our configuration router.
var Router = config.Router{}

func main() {
	router := Router.NewRouter()

	log.Println("Listening...")
	log.Fatal(http.ListenAndServe(":8080", router))
}
