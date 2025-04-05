package server

import (
	"overtodo/routers"

	"github.com/gin-gonic/gin"
)

func Start() *gin.Engine {
	router := routers.RegisterRoutes()
	return router
}
