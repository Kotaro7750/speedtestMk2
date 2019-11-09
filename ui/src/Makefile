install:
	npm install

dev:
	REACT_APP_URL=http://localhost:1991 REACT_APP_TEST=hoge npm run start

build:
	rm -rf build
	npm run build
	cp ./telemetry/garbage.php ./build
	cp ./telemetry/empty.php ./build
	cp ./telemetry/getIP.php ./build

setup: __clean install
	cp .env.example .env

__clean:
	rm -rf .cache
	rm -rf node_modules
