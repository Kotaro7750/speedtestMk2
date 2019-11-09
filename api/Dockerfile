FROM golang:1.13 AS builder

COPY ./src /go/src/speedtestMk2
WORKDIR /go/src/speedtestMk2
RUN GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -ldflags '-extldflags "-static"'
RUN go install speedtestMk2

FROM alpine
ARG PORT
ARG DATABASE_DATASOURCE

RUN apk --update add tzdata && cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime
RUN apk add --no-cache libc6-compat
COPY --from=builder /go/bin/speedtestMk2 /app/speedtestMk2
ENV TZ="Asia/Tokyo"
ENV PORT ${PORT}
ENV DATABASE_DATASOURCE ${DATABASE_DATASOURCE}
WORKDIR /app
CMD ["./speedtestMk2"]
