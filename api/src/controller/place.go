package controller

import (
	"database/sql"
	"encoding/json"
	"github.com/gin-gonic/gin"
	"net/http"
	"speedtestMk2/model"
)

type PlaceCtl struct {
	DB *sql.DB
}

func (p *PlaceCtl) GetPlaceList(c *gin.Context) {
	places, err := model.GetPlaceList(p.DB)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err,
		})
	}

	res, err := json.Marshal(places)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"result": string(res),
		"error":  nil,
	})
	return
}
