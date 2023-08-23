package helpers

import (
	"database/sql"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/lib/pq"
)

func HandleErr(c *gin.Context, err error, errMsg string) bool {
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": errMsg})
		return true
	}
	return false
}

func handleNullString(ns sql.NullString) string {
	if ns.Valid {
		return ns.String
	}
	return ""
}

func NullOrValue(val interface{}) interface{} {
	switch v := val.(type) {
	case string:
		if v == "" {
			return nil
		}
	case int:
		if v == 0 {
			return nil
		}
	case []string:
		return pq.Array(v)
	}

	return val
}

func nullOrArray(arr []string) interface{} {
	if len(arr) == 0 {
		return nil
	}
	return pq.Array(arr)
}

func JsonResponse(c *gin.Context, status int, data interface{}, err error) {
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}
	c.IndentedJSON(status, data)
}

func GenerateUpdateQuery(fields map[string]interface{}, tableName string, idColumn string, idValue interface{}) (string, []interface{}) {
	query := "UPDATE " + tableName + " SET "
	var values []interface{}
	index := 1

	for fieldName := range fields {
		if fieldValue, ok := fields[fieldName]; ok {
			query += fieldName + " = $" + strconv.Itoa(index) + ", "
			values = append(values, fieldValue)
			index++
		}
	}

	query = strings.TrimSuffix(query, ", ")

	query += " WHERE " + idColumn + " = $" + strconv.Itoa(index) + " RETURNING *"
	values = append(values, idValue)

	return query, values
}
