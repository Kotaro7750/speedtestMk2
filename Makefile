init:
	cp env.example .env

run-init:
	docker-compose up -d --build

run:
	docker-compose up -d 

debug:
	docker-compose up --build

stop:
	docker-compose down

init-db:
	sudo rm -rf ./db/mysql_data/*

.PHONY:clean
clean:
	rm -f .env
