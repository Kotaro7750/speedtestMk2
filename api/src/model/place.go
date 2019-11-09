package model

import (
	"database/sql"
	"log"
)

type Place struct {
	Id    int    `json:"id"`
	Place string `json:"place"`
}

func GetPlaceList(db *sql.DB) ([]Place, error) {
	rows, err := db.Query("SELECT id,place FROM place")
	if err != nil {
		log.Printf("Query Error: %s", err.Error())
		return nil, err
	}
	defer rows.Close()

	var places []Place
	for rows.Next() {
		var place Place
		if err := rows.Scan(&place.Id, &place.Place); err != nil {
			log.Printf("Scan Error: %s", err.Error())
			return nil, err
		}
		places = append(places, place)
	}
	return places, nil
}
