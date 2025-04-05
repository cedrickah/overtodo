package main

import (
	"log"
	"net/http"
	"overtodo/db"
	"overtodo/server"
)

func main() {
	db.Connect()
	router := server.Start()

	log.Println("Server running on port 8080")
    http.ListenAndServe(":8080", router)
}
