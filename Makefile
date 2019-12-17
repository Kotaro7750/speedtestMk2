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
	docker-compose down --rmi all
	sudo rm -rf ./db/mysql_data/*
	sudo rm -rf ./db/init_sql/1_place_init.sql
	sudo rm -rf ./db/init_sql/2_telemetry_init_DEBUG.sql
	python3 db/place_init_sql.py

init-db-debug:
	docker-compose down --rmi all
	sudo rm -rf ./db/mysql_data/*
	python3 db/place_init_sql.py DEBUG

.PHONY:clean
clean:
	rm -f .env
