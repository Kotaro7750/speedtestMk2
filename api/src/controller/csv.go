package controller

import (
	"bytes"
	"database/sql"
	"encoding/csv"
	"github.com/gin-gonic/gin"
	"net/http"
	"speedtestMk2/model"
	"strconv"
)

type CsvCtl struct {
	DB *sql.DB
}

func (csvCtl *CsvCtl) All(c *gin.Context) {
	telemetries, err := model.ListAllTelemetry(csvCtl.DB)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err,
		})
		return
	}

	buf := &bytes.Buffer{}
	csvWriter := csv.NewWriter(buf)

	if err := csvWriter.Write([]string{"place", "ping(ms)", "jitter(ms)", "upload(Mbps)", "download(Mbps)", "time"}); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err,
		})
		return
	}

	for _, telemetry := range telemetries {
		var telemetryStr []string
		telemetryStr = append(telemetryStr, telemetry.Place)
		telemetryStr = append(telemetryStr, strconv.FormatFloat(telemetry.Ping, 'f', 4, 64))
		telemetryStr = append(telemetryStr, strconv.FormatFloat(telemetry.Jitter, 'f', 4, 64))
		telemetryStr = append(telemetryStr, strconv.FormatFloat(telemetry.Upload, 'f', 4, 64))
		telemetryStr = append(telemetryStr, strconv.FormatFloat(telemetry.Download, 'f', 4, 64))
		telemetryStr = append(telemetryStr, telemetry.Time)
		if err := csvWriter.Write(telemetryStr); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err,
			})
			return
		}
	}

	csvWriter.Flush()
	if err := csvWriter.Error(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err,
		})
		return
	}

	c.Header("Content-Description", "File Transfer")
	c.Header("Content-Disposition", "attachment; filename=telemetry.csv")
	c.Data(http.StatusOK, "text/csv", buf.Bytes())
}
