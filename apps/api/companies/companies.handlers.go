package companies

import (
	"base10api/app"
	"base10api/helpers"
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/lib/pq"
)

func GetAllCompanies(app *app.App) gin.HandlerFunc {
	return func(c *gin.Context) {
		rows, err := app.DB.Query("SELECT * FROM companies;")
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch companies"})
			return
		}
		defer rows.Close()

		companies, err := scanCompanyRows(rows)

		if helpers.HandleErr(c, err, "Failed to get companies") {
			return
		}

		c.JSON(http.StatusOK, companies)
	}
}

func GetCompany(app *app.App) gin.HandlerFunc {
	return func(c *gin.Context) {
		companyID := c.Param("id")

		row := app.DB.QueryRow("SELECT * FROM companies WHERE id = $1", companyID)
		company, err := scanCompanyRow(row)

		if err != nil {
			if err == sql.ErrNoRows {
				c.JSON(http.StatusNotFound, gin.H{"error": "Company not found"})
				return
			}
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete company"})
			return
		}

		c.IndentedJSON(http.StatusOK, company)
	}
}

func CreateCompany(app *app.App) gin.HandlerFunc {
	return func(c *gin.Context) {
		var newCompany Company
		if err := c.ShouldBindJSON(&newCompany); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data"})
			return
		}

		if newCompany.Name == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Name field is required"})
			return
		}

		query := `
            INSERT INTO companies (
				name,
				industry,
				business_models,
				hq_location,
				founder_quality,
				feature_set
			)
            VALUES (
				$1, $2, $3, $4, $5, $6
			)
            RETURNING *`

		stmt, err := app.DB.Prepare(query)
		if err != nil {
			helpers.HandleErr(c, err, "Failed to prepare query")
			return
		}
		defer stmt.Close()

		row := stmt.QueryRow(
			newCompany.Name,
			helpers.NullOrValue(newCompany.Industry),
			helpers.NullOrValue(newCompany.BusinessModels),
			helpers.NullOrValue(newCompany.HQLocation),
			helpers.NullOrValue(newCompany.FounderQuality),
			helpers.NullOrValue(newCompany.FeatureSet),
		)

		createdCompany, err := scanCompanyRow(row)
		if helpers.HandleErr(c, err, "Failed to create company") {
			return
		}

		helpers.JsonResponse(c, http.StatusCreated, createdCompany, nil)
	}
}

func UpdateCompany(app *app.App) gin.HandlerFunc {
	return func(c *gin.Context) {
		companyID := c.Param("id")

		var fields map[string]interface{}
		if err := c.BindJSON(&fields); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		query, values := helpers.GenerateUpdateQuery(fields, "companies", "id", companyID)

		var updatedCompany Company
		row := app.DB.QueryRow(query, values...)
		updatedCompany, err := scanCompanyRow(row)

		if err != nil {
			if err == sql.ErrNoRows {
				c.JSON(http.StatusNotFound, gin.H{"error": "Company not found"})
				return
			}
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update company"})
			return
		}

		c.JSON(http.StatusOK, updatedCompany)
	}
}

func DeleteCompany(app *app.App) gin.HandlerFunc {
	return func(c *gin.Context) {
		companyID := c.Param("id")

		deleteQuery := "DELETE FROM companies WHERE id = $1 RETURNING *"
		row := app.DB.QueryRow(deleteQuery, companyID)

		deletedCompany, err := scanCompanyRow(row)

		if err != nil {
			if err == sql.ErrNoRows {
				c.JSON(http.StatusNotFound, gin.H{"error": "Company not found"})
				return
			}
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete company"})
			return
		}

		c.JSON(http.StatusOK, deletedCompany)
	}
}

func scanCompanyRow(row *sql.Row) (Company, error) {
	var company Company

	err := row.Scan(
		&company.ID,
		&company.Name,
		&company.Industry,
		pq.Array(&company.BusinessModels),
		&company.HQLocation,
		&company.FounderQuality,
		&company.FeatureSet,
		&company.CreatedAt,
		&company.UpdatedAt,
	)

	if err != nil {
		return company, err
	}

	return company, nil
}

func scanCompanyRows(rows *sql.Rows) ([]Company, error) {
	var companies []Company
	for rows.Next() {
		var company Company
		err := rows.Scan(
			&company.ID,
			&company.Name,
			&company.Industry,
			pq.Array(&company.BusinessModels),
			&company.HQLocation,
			&company.FounderQuality,
			&company.FeatureSet,
			&company.CreatedAt,
			&company.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}

		companies = append(companies, company)
	}
	return companies, nil
}
