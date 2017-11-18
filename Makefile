WORKING_DIR=$(shell pwd)

build:
	rm -rf public && hugo
	docker run --rm -v $(WORKING_DIR):$(WORKING_DIR) -w $(WORKING_DIR) node:alpine \
		./node_modules/.bin/gulp html

dependencies:
	docker run --rm -v $(WORKING_DIR):$(WORKING_DIR) -w $(WORKING_DIR) node:alpine \
		yarn install --no-lockfile

deploy:
	aws s3 sync --delete public/ s3://www.rafalp.com/

run:
	hugo server

styles:
	docker run --rm -v $(WORKING_DIR):$(WORKING_DIR) -w $(WORKING_DIR) node:alpine \
		./node_modules/.bin/gulp css
