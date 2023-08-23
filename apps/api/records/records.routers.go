package records

import (
	"base10api/app"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine, app *app.App) {
	router.GET("/records", GetAllRecords(app))
	router.GET("/records/:id", GetRecord(app))
	router.POST("/records", CreateRecord(app))
	router.PUT("/records/:id", UpdateRecord(app))
	router.DELETE("/records/:id", DeleteRecord(app))
}
