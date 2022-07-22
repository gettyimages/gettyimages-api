#!/usr/bin/env bash

source ./functions.sh
assert-curl
assert-credentials

curl -s -X POST -H "Content-Type: application/x-www-form-urlencoded" -d "grant_type=client_credentials&client_id=$CLIENT_ID&client_secret=$CLIENT_SECRET" "https://api.gettyimages.com/v4/oauth2/token"
