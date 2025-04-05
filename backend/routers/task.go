package routers

import (
	"overtodo/controllers"

	"github.com/gin-gonic/gin"
)


func RegisterRoutes() *gin.Engine {
	router := gin.Default()

    router.GET("/tasks", controllers.GetTasks)
	router.POST("/tasks", controllers.AddTask)
	router.PUT("/tasks/:id", controllers.UpdateTaskStatus)
	router.DELETE("/tasks/:id", controllers.DeleteTask)
	return router
}
