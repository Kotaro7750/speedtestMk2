CONTAINER=speedtest_db

build:
	docker build -t $(CONTAINER) .

run:build
	docker run --rm -d -p 3306:3306 --name $(CONTAINER) $(CONTAINER)

mysql:
	mysql -h127.0.0.1 -utest -ptest

debug:build
	docker run --rm -p 3306:3306 --name $(CONTAINER) $(CONTAINER)


.PHONY:clean
clean:
	docker stop $(CONTAINER)
