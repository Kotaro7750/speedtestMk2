init:
	cp env.example .env


.PHONY:clean
clean:
	rm -f .env
