GOOS := linux
GOARCH := amd64

init: .env

.env:
	cp $@.example $@

run:
	PORT=1990 DATABASE_DATASOURCE="test:test@tcp(localhost:3306)/speedtest?parseTime=true&charset=utf8mb4&interpolateParams=true" go run main.go

build:
	CGO_ENABLED=0 GOOS=$(GOOS) GOARCH=$(GOARCH) go build -o main -ldflags '-extldflags "-static"' main.go
