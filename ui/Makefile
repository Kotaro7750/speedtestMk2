install:
	npm install

dev:
	npm run start

build:
	npm run build

setup: __clean install
	cp .env.example .env

__clean:
	rm -rf .cache
	rm -rf node_modules