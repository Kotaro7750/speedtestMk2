package model

import (
	"database/sql"
	"log"
)

type Telemetry struct {
	Id       int
	Place    int     `json:"place"`
	Ping     float64 `json:"ping"`
	Jitter   float64 `json:"jitter"`
	Upload   float64 `json:"upload"`
	Download float64 `json:"download"`
}

type RetTelemetry struct {
	Place    string
	Ping     float64
	Jitter   float64
	Upload   float64
	Download float64
	Time     string
}

func AddTelemetry(db *sql.DB, t Telemetry) error {
	ins, err := db.Prepare("INSERT INTO telemetry (place,ping,jitter,upload,download) VALUES(?,?,?,?,?)")
	if err != nil {
		log.Printf("Query Error: %s", err.Error())
		return err
	}

	ins.Exec(t.Place, t.Ping, t.Jitter, t.Upload, t.Download)
	return nil
}

func ListAllTelemetry(db *sql.DB) ([]RetTelemetry, error) {
	rows, err := db.Query("SELECT place.place,telemetry.ping,telemetry.jitter,telemetry.upload,telemetry.download,telemetry.time FROM telemetry inner join place on telemetry.place = place.id")

	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	var telemetries []RetTelemetry

	for rows.Next() {
		var telemetry RetTelemetry
		if err := rows.Scan(&telemetry.Place, &telemetry.Ping, &telemetry.Jitter, &telemetry.Upload, &telemetry.Download, &telemetry.Time); err != nil {
			log.Printf("Query Error: %s", err.Error())
			return nil, err
		}
		telemetries = append(telemetries, telemetry)
	}

	if err := rows.Err(); err != nil {
		log.Printf("Row Error: %s", err.Error())
		return nil, err
	}
	return telemetries, nil
}
