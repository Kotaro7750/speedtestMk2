package main

import (
	"database/sql"
	"log"
	"net/http"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"speedtestMk2/controller"
)

func main() {
	datasource := os.Getenv("DATABASE_DATASOURCE")
	if datasource == "" {
		log.Fatal("Cannot get datasource for database.")
	}

	db, err := sql.Open("mysql", datasource)
	if err != nil {
		log.Fatal("Cannot open database")
	}
	log.Printf("datasource is %s\n", datasource)
	defer db.Close()

	placeCtl := controller.PlaceCtl{DB: db}

	http.HandleFunc("/place", placeCtl.GetPlaceList)
	err = http.ListenAndServe(":"+os.Getenv("PORT"), nil)

	if err != nil {
		log.Fatal("Cannot listen!")
	}
}
