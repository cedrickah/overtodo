package utils

import (
	"github.com/gin-gonic/gin"
)

func HandleError(c *gin.Context, s int, err error) {
    c.JSON(s, gin.H{"error": err.Error()})
}
