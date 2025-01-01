package server

import (
	"log"

	"overtodo/db"
	"overtodo/routers"
)

func Start() {
	_, err := db.Connect()
	if err != nil {
		log.Fatalf("Failed to create the driver: %v", err)
	}
	routers.RegisterRoutes()
}
