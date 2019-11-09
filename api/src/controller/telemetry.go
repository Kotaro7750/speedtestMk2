package controller

import (
	"database/sql"
	"github.com/gin-gonic/gin"
	"net/http"
	"speedtestMk2/model"
)

type TelemetryCtl struct {
	DB *sql.DB
}

func (t *TelemetryCtl) Add(c *gin.Context) {
	var telemetry model.Telemetry

	if err := c.ShouldBindJSON(&telemetry); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	err := model.AddTelemetry(t.DB, telemetry)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
	}

	c.JSON(http.StatusOK, gin.H{
		"result": telemetry,
		"error":  nil,
	})
}
