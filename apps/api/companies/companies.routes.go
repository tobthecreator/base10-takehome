package companies

import (
	"base10api/app"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine, app *app.App) {
	router.GET("/companies", GetAllCompanies(app))
	router.GET("/companies/:id", GetCompany(app))
	router.POST("/companies", CreateCompany(app))
	router.PUT("/companies/:id", UpdateCompany(app))
	router.DELETE("/companies/:id", DeleteCompany(app))
}
