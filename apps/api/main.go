package main

import (
	"base10api/app"
	"base10api/companies"
	"base10api/records"
	"database/sql"
	"log"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

func corsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:4200")

		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS, DELETE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func main() {
	postgresURI := "postgresql://postgres:<password>@localhost:5432/base10?sslmode=disable"

	db, err := sql.Open("postgres", postgresURI)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	app := &app.App{DB: db}

	router := gin.Default()
	router.Use(corsMiddleware())

	// TODO using router groups was throwing CORS issues :(
	companies.SetupRoutes(router, app)
	records.SetupRoutes(router, app)

	router.Run("localhost:8080")
}
