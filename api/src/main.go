package main

import (
	"bytes"
	"database/sql"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"os"
	"text/template"

	_ "github.com/go-sql-driver/mysql"
	"speedtestMk2/controller"
)

type LineOfLog struct {
	RemoteAddr  string
	ContentType string
	Path        string
	Query       string
	Method      string
	Body        string
}

var TemplateOfLog = `
Remote address:   {{.RemoteAddr}}
Content-Type:     {{.ContentType}}
HTTP method:      {{.Method}}

path:
{{.Path}}

query string:
{{.Query}}

body:             
{{.Body}}

`

func Log(handler http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		bufbody := new(bytes.Buffer)
		bufbody.ReadFrom(r.Body)
		body := bufbody.String()

		line := LineOfLog{
			r.RemoteAddr,
			r.Header.Get("Content-Type"),
			r.URL.Path,
			r.URL.RawQuery,
			r.Method, body,
		}
		tmpl, err := template.New("line").Parse(TemplateOfLog)
		if err != nil {
			panic(err)
		}

		bufline := new(bytes.Buffer)
		err = tmpl.Execute(bufline, line)
		if err != nil {
			panic(err)
		}

		log.Printf(bufline.String())
		handler.ServeHTTP(w, r)
	})
}

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

	if err := db.Ping(); err != nil {
		log.Fatal(err.Error())
	}

	placeCtl := controller.PlaceCtl{DB: db}
	telemetryCtl := controller.TelemetryCtl{DB: db}
	csvCtl := controller.CsvCtl{DB: db}

	router := gin.Default()

	//CORS
	//clientURL := os.Getenv("CLIENT_URL")

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"*"}
	config.AllowHeaders = []string{"Content-Type", "Authorization"}

	router.Use(cors.New(config))

	router.GET("/place", placeCtl.GetPlaceList)
	router.POST("/telemetry", telemetryCtl.Add)
	router.GET("/csv/all", csvCtl.All)

	Port := os.Getenv("PORT")
	router.Run(":" + Port)
}
