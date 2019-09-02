install:
	npm install

dev:
	npm run start

build:
	npm run build
	cp ./telemetry/garbage.php ./build
	cp ./telemetry/empty.php ./build
	cp ./telemetry/getIP.php ./build

setup: __clean install
	cp .env.example .env

__clean:
	rm -rf .cache
	rm -rf node_modules