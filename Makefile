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

deploy:
ifndef FASTLY_API_KEY
	$(error FASTLY_API_KEY is not set. You can find the key in Vault)
endif
	@npx ssf deploy --directory build --service 3QKc6nmmSk44A7BEDfMFGI --snippet 1pblCPP9QkF1U9NKEi3zTf --fastly-api-key ${FASTLY_API_KEY}
	@$(DONE)
