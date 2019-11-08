package controller

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"speedtestMk2/model"
)

type PlaceCtl struct {
	DB *sql.DB
}

func (p *PlaceCtl) GetPlaceList(w http.ResponseWriter, r *http.Request) {
	places, err := model.GetPlaceList(p.DB)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	res, err := json.Marshal(places)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(res)
}
