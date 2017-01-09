include n.Makefile


# Config vars
# -----------

EXPECTED_COVERAGE = 90

# Build tasks
# -----------

.PHONY: build
build:
	@node ./src/build.js
	@$(DONE)

# Verify tasks
# ------------

verify-coverage:
	@istanbul check-coverage --statement $(EXPECTED_COVERAGE) --branch $(EXPECTED_COVERAGE) --function $(EXPECTED_COVERAGE)
	@$(DONE)


# Test tasks
# ----------

test: build test-unit-coverage verify-coverage test-integration
	@$(DONE)

test-unit:
	@NODE_ENV=test mocha test/unit --recursive
	@$(DONE)

test-unit-coverage:
	@NODE_ENV=test istanbul cover node_modules/.bin/_mocha -- test/unit --recursive
	@$(DONE)

test-integration:
	@NODE_ENV=test mocha test/integration --recursive --timeout 10000 --slow 2000
	@$(DONE)


# Deploy tasks
# ------------

deploy:

ifndef AWS_ACCESS_KEY
	$(error AWS_ACCESS_KEY is not set. You can find the key in LastPass)
endif
ifndef AWS_SECRET_KEY
	$(error AWS_SECRET_KEY is not set. You can find the key in LastPass)
endif
	@s3-cli put ./build/navigation.json s3://origami-navigation-service-data-eu/v2/navigation.json --region eu-west-1 -P
	@s3-cli put ./build/navigation.json s3://origami-navigation-service-data-us/v2/navigation.json --region us-east-1 -P
	@$(DONE)

update-cmdb:
ifndef CMDB_API_KEY
	$(error CMDB_API_KEY is not set, cannot send updates to CMDB. You can find the key in LastPass)
endif
	@curl --silent --show-error -H 'Content-Type: application/json' -H 'apikey: ${CMDB_API_KEY}' -X PUT https://cmdb.ft.com/v2/items/system/origami-navigation-service-data -d @operational-documentation/runbook.json

# Change Request tasks
# --------------------

CR_EMAIL=rowan.manning@ft.com
CR_APPNAME=Origami Navigation Service Data
CR_DESCRIPTION="Uploading new navigation data to S3. Release triggered by CI"
CR_SERVICE_ID=Origami Navigation Service Data
CR_NOTIFY_CHANNEL=origami-deploys

change-request:
ifndef CR_API_KEY
	$(error CR_API_KEY is not set. You can find the key in LastPass)
endif
	@release-log \
		--environment "Production" \
		--api-key "$(CR_API_KEY)" \
		--summary "Releasing $(CR_APPNAME) to production" \
		--description "$(CR_DESCRIPTION)" \
		--owner-email "$(CR_EMAIL)" \
		--service "$(CR_SERVICE_ID)" \
		--notify-channel "$(CR_NOTIFY_CHANNEL)" \
		|| true
	@$(DONE)
