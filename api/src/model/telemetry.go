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

func AddTelemetry(db *sql.DB, t Telemetry) error {
	ins, err := db.Prepare("INSERT INTO telemetry (place,ping,jitter,upload,download) VALUES(?,?,?,?,?)")
	if err != nil {
		log.Printf("Query Error: %s", err.Error())
		return err
	}

	ins.Exec(t.Place, t.Ping, t.Jitter, t.Upload, t.Download)
	return nil
}
