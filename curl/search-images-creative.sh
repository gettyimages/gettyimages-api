#!/usr/bin/env bash
source ./functions.sh
assert-requirements
assert-credentials

# Get an access token using *client credentials*
# "https://developers.gettyimages.com/docs/authorization/#client-credentials-grant"
TOKEN=$(source ./auth-client-credentials.sh | jq -r .'access_token')
curl -s -H "Authorization: Bearer $TOKEN" -H "api-key: $CLIENT_ID" \
"https://api.gettyimages.com/v3/search/images/creative?page_size=2&phrase=$1" \
| jq .

