package records

import (
	"base10api/app"
	"base10api/helpers"
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetAllRecords(app *app.App) gin.HandlerFunc {
	return func(c *gin.Context) {
		rows, err := app.DB.Query("SELECT * FROM records;")
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch records"})
			return
		}
		defer rows.Close()

		records, err := scanRecordRows(rows)

		if helpers.HandleErr(c, err, "Failed to get records") {
			return
		}

		c.JSON(http.StatusOK, records)
	}
}

func GetRecord(app *app.App) gin.HandlerFunc {
	return func(c *gin.Context) {
		recordId := c.Param("id")

		row := app.DB.QueryRow("SELECT * FROM records WHERE id = $1", recordId)
		record, err := scanRecordRow(row)

		if err != nil {
			if err == sql.ErrNoRows {
				c.JSON(http.StatusNotFound, gin.H{"error": "Record not found"})
				return
			}
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete record"})
			return
		}

		c.IndentedJSON(http.StatusOK, record)
	}
}

func CreateRecord(app *app.App) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Note to self, dates have to be string of "YYYY-MM-DDTHH:MM:SSZ" to be properly parsed, yeesh
		var newRecord Record
		if err := c.ShouldBindJSON(&newRecord); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data"})
			return
		}

		query := `
            INSERT INTO records (
				company_id,
                date, 
                revenue, 
                cash_burn, 
                gross_profit_percentage, 
                gross_profit_amount, 
                ebitda, 
                cash_on_hand, 
                cac, 
                ltv, 
                acv, 
                arpu, 
                customer_count, 
                next_fundraise_date
            )
            VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
            )
            RETURNING *`

		stmt, err := app.DB.Prepare(query)
		if err != nil {
			helpers.HandleErr(c, err, "Failed to prepare query")
			return
		}
		defer stmt.Close()

		row := stmt.QueryRow(
			newRecord.CompanyId,
			newRecord.Date,
			helpers.NullOrValue(newRecord.Revenue),
			helpers.NullOrValue(newRecord.CashBurn),
			helpers.NullOrValue(newRecord.GrossProfitPercent),
			helpers.NullOrValue(newRecord.GrossProfitAmount),
			helpers.NullOrValue(newRecord.EBITDA),
			helpers.NullOrValue(newRecord.CashOnHand),
			helpers.NullOrValue(newRecord.CAC),
			helpers.NullOrValue(newRecord.LTV),
			helpers.NullOrValue(newRecord.ACV),
			helpers.NullOrValue(newRecord.ARPU),
			helpers.NullOrValue(newRecord.CustomerCount),
			helpers.NullOrValue(newRecord.NextFundraiseDate),
		)

		createdRecord, err := scanRecordRow(row)
		if helpers.HandleErr(c, err, "Failed to create record") {
			return
		}

		helpers.JsonResponse(c, http.StatusCreated, createdRecord, nil)
	}
}

func UpdateRecord(app *app.App) gin.HandlerFunc {
	return func(c *gin.Context) {
		recordId := c.Param("id")

		var fields map[string]interface{}
		if err := c.BindJSON(&fields); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		query, values := helpers.GenerateUpdateQuery(fields, "records", "id", recordId)

		var updatedRecord Record
		row := app.DB.QueryRow(query, values...)
		updatedRecord, err := scanRecordRow(row)

		if err != nil {
			if err == sql.ErrNoRows {
				c.JSON(http.StatusNotFound, gin.H{"error": "Record not found"})
				return
			}
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update record"})
			return
		}

		c.JSON(http.StatusOK, updatedRecord)
	}
}

func DeleteRecord(app *app.App) gin.HandlerFunc {
	return func(c *gin.Context) {
		companyID := c.Param("id")

		deleteQuery := "DELETE FROM records WHERE id = $1 RETURNING *"
		row := app.DB.QueryRow(deleteQuery, companyID)

		deletedRecord, err := scanRecordRow(row)

		if err != nil {
			if err == sql.ErrNoRows {
				c.JSON(http.StatusNotFound, gin.H{"error": "Record not found"})
				return
			}
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete record"})
			return
		}

		c.JSON(http.StatusOK, deletedRecord)
	}
}

func scanRecordRow(row *sql.Row) (Record, error) {
	var record Record

	// these need to be in the order they appear in the table
	err := row.Scan(
		&record.ID,
		&record.Date,
		&record.Revenue,
		&record.CashBurn,
		&record.GrossProfitPercent,
		&record.GrossProfitAmount,
		&record.EBITDA,
		&record.CashOnHand,
		&record.CAC,
		&record.LTV,
		&record.ACV,
		&record.ARPU,
		&record.CustomerCount,
		&record.NextFundraiseDate,
		&record.CreatedAt,
		&record.UpdatedAt,
		&record.CompanyId,
	)

	if err != nil {
		return record, err
	}

	return record, nil
}

func scanRecordRows(rows *sql.Rows) ([]Record, error) {
	var records []Record
	for rows.Next() {
		var record Record

		// these need to be in the order they appear in the table
		err := rows.Scan(
			&record.ID,
			&record.Date,
			&record.Revenue,
			&record.CashBurn,
			&record.GrossProfitPercent,
			&record.GrossProfitAmount,
			&record.EBITDA,
			&record.CashOnHand,
			&record.CAC,
			&record.LTV,
			&record.ACV,
			&record.ARPU,
			&record.CustomerCount,
			&record.NextFundraiseDate,
			&record.CreatedAt,
			&record.UpdatedAt,
			&record.CompanyId,
		)
		if err != nil {
			return nil, err
		}

		records = append(records, record)
	}

	return records, nil
}
