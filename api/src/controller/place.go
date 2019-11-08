package controller

import (
	"encoding/json"
	"net/http"
	"speedtestMk2/model"
)

type PlaceCtl struct {
}

func (p *PlaceCtl) GetPlaceList(w http.ResponseWriter, r *http.Request) {
	place := model.Place{"一号館"}

	res, err := json.Marshal(place)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(res)
}
