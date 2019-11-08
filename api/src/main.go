package main

import (
	"database/sql"
	"github.com/joho/godotenv"
	"log"
	"net/http"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"speedtestMk2/controller"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("error loading .env file. %s", err)
	}
	datasource := os.Getenv("DATABASE_DATASOURCE")
	if datasource == "" {
		log.Fatal("Cannot get datasource for database.")
	}

	db, err := sql.Open("mysql", datasource)
	if err != nil {
		log.Fatal("Cannot open database")
	}
	defer db.Close()

	placeCtl := controller.PlaceCtl{DB: db}

	http.HandleFunc("/place", placeCtl.GetPlaceList)
	err = http.ListenAndServe(":"+os.Getenv("PORT"), nil)

	if err != nil {
		log.Fatal("Cannot listen!")
	}
}
