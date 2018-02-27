# Origami Service Makefile
# ------------------------
# This section of the Makefile should not be modified, it includes
# commands from the Origami service Makefile.
# https://github.com/Financial-Times/origami-service-makefile
include node_modules/@financial-times/origami-service-makefile/index.mk
# [edit below this line]
# ------------------------


# Configuration
# -------------

INTEGRATION_TIMEOUT = 30000
INTEGRATION_SLOW = 2000

SERVICE_NAME = Origami Navigation Service Data
SERVICE_SYSTEM_CODE = origami-navigation-service-data
SERVICE_SALESFORCE_ID = $(SERVICE_NAME)
REGION = NONE

export GITHUB_RELEASE_REPO := Financial-Times/origami-navigation-data


# Build tasks
# -----------

.PHONY: build
build:
	@node ./src/cli.js --file data/links.yaml --file data/navigation.yaml
	@$(DONE)


# Deploy tasks
# ------------

deploy-s3:
ifndef AWS_ACCESS_KEY
	$(error AWS_ACCESS_KEY is not set. You can find the key in LastPass)
endif
ifndef AWS_SECRET_KEY
	$(error AWS_SECRET_KEY is not set. You can find the key in LastPass)
endif
	@s3-cli put ./build/navigation.json s3://origami-navigation-service-data-eu/v2/navigation.json --region eu-west-1 -P
	@s3-cli put ./build/navigation.json s3://origami-navigation-service-data-us/v2/navigation.json --region us-east-1 -P
	@s3-cli put ./build/links.json s3://origami-navigation-service-data-eu/v2/links.json --region eu-west-1 -P
	@s3-cli put ./build/links.json s3://origami-navigation-service-data-us/v2/links.json --region us-east-1 -P
	@$(DONE)

update-cmdb:
ifndef CMDB_API_KEY
	$(error CMDB_API_KEY is not set, cannot send updates to CMDB. You can find the key in LastPass)
endif
	@curl --silent --show-error -H 'Content-Type: application/json' -H 'apikey: ${CMDB_API_KEY}' -X PUT https://cmdb.in.ft.com/v2/items/system/origami-navigation-service-data -d @operational-documentation/runbook.json
