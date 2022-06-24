package main

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

var (
	data = NewHailData(10)
)

func status(c *gin.Context) {
	if data.IsStale() {
		data.Update()
	}

	c.JSON(http.StatusOK, data)
}

func main() {
	r := gin.Default()

	api := r.Group("/api")
	{
		api.GET("/status", status)
	}

	port := ":8080"
	if val, ok := os.LookupEnv("FUNCTIONS_CUSTOMHANDLER_PORT"); ok {
		port = ":" + val
	}
	r.Run(port)
}
