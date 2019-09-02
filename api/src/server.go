package server

import (
	"fmt"

	"github.com/Kotaro7750/speedtestMk2/db"
	"github.com/Kotaro7750/speedtestMk2/middleware"

	"log"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
	"github.com/justinas/alice"

	"github.com/gorilla/mux"
	"github.com/jmoiron/sqlx"
	"github.com/rs/cors"
)

type Server struct {
	db     *sqlx.DB
	router *mux.Router
}

func NewServer() *Server {
	return &Server{}
}

func (s *Server) Init(datasource string) {
	cs := db.NewDB(datasource)
	dbcon, err := cs.Open()
	if err != nil {
		log.Fatalf("failed db init. %s", err)
	}
	s.db = dbcon
	s.router = s.Route()
}

func (s *Server) Run(addr string) {
	log.Printf("Listening on port %s", addr)
	err := http.ListenAndServe(
		fmt.Sprintf(":%s", addr),
		handlers.CombinedLoggingHandler(os.Stdout, s.router),
	)
	if err != nil {
		panic(err)
	}
}

func (s *Server) Route() *mux.Router {
	corsMiddleware := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedHeaders: []string{"Authorization", "Content-Type"},
		AllowedMethods: []string{
			http.MethodHead,
			http.MethodGet,
			http.MethodPost,
			http.MethodPut,
			http.MethodPatch,
			http.MethodDelete,
			http.MethodOptions,
		},
	})

	commonChain := alice.New(
		middleware.RecoverMiddleware,
		corsMiddleware.Handler,
	)

	r := mux.NewRouter()

	r.PathPrefix("").Handler(commonChain.Then(http.StripPrefix("/img", http.FileServer(http.Dir("./img")))))
	return r
}
