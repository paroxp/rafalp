WORKING_DIR=$(shell pwd)

build: images styles scripts
	rm -rf public && hugo
	docker run --rm -v $(WORKING_DIR):$(WORKING_DIR) -w $(WORKING_DIR) node:alpine \
		npm run html

dependencies:
	docker run --rm -v $(WORKING_DIR):$(WORKING_DIR) -w $(WORKING_DIR) node:alpine \
		npm install --no-package-lock

deploy:
	aws s3 sync --delete public/ s3://www.rafalp.com/

images:
	curl https://www.gravatar.com/avatar/8f45b22841bba3868c141f3ca3470139.png?s=150 > static/img/avatar.png

run:
	hugo server

styles:
	docker run --rm -v $(WORKING_DIR):$(WORKING_DIR) -w $(WORKING_DIR) node:alpine \
		npm run styles

scripts:
	docker run --rm -v $(WORKING_DIR):$(WORKING_DIR) -w $(WORKING_DIR) node:alpine \
		npm run scripts
