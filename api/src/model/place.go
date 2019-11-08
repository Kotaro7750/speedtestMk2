package model

import (
	"database/sql"
)

type Place struct {
	Id    int    `json:"id"`
	Place string `json:"place"`
}

func GetPlaceList(db *sql.DB) ([]Place, error) {
	rows, err := db.Query("select * from place")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var places []Place
	for rows.Next() {
		var place Place
		if err := rows.Scan(&place.Id, &place.Place); err != nil {
			return nil, err
		}
		places = append(places, place)
	}
	return places, nil
}
