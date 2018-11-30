# Default env vars
ARGS?=

GIT_SHA=$(shell git rev-parse HEAD)
TAG=slightlytyler/ui-dev-env
VERSION=0.0.1
VOLUME_MOUNTS=-v $(PWD)/src:/usr/app/src \
			  -v $(PWD)/package.json:/usr/app/package.json \
			  -v $(PWD)/webpack.config.js:/usr/app/webpack.config.js
VOLUME_MOUNTS_WITH_DEP_STUFF=$(VOLUME_MOUNTS) -v $(PWD)/yarn.lock:/usr/app/yarn.lock

all: build

build:
	docker build -t $(TAG):$(GIT_SHA) . \
		&& docker tag $(TAG):$(GIT_SHA) $(TAG):latest

publish:
	docker tag $(TAG):latest $(TAG):$(VERSION) \
		&& docker push $(TAG):$(VERSION) \
		&& docker push $(TAG):latest

push:
	docker push $(TAG):$(GIT_SHA)

run:
	docker run -it --rm $(VOLUME_MOUNTS) $(TAG) $(ARGS)

run-dev:
	docker run -it --rm -p $(PORT):$(PORT) $(VOLUME_MOUNTS) $(TAG) \
		dev $(ARGS)

run-yarn:
	docker run -it --rm $(VOLUME_MOUNTS_WITH_DEP_STUFF) $(TAG) $(ARGS)

run-%:
	docker run -it --rm $(VOLUME_MOUNTS) $(TAG) $$(echo $@ | sed 's/run-//') $(ARGS)

.PHONY: build publish push run run-dev run-yarn
