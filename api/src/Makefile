GOOS := linux
GOARCH := amd64

init: .env

.env:
	cp $@.example $@

run:
	go run main.go

build:
	CGO_ENABLED=0 GOOS=$(GOOS) GOARCH=$(GOARCH) go build -o main -ldflags '-extldflags "-static"' main.go
