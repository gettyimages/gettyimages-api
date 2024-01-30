#!/usr/bin/env bash

source ./functions.sh
assert-curl
assert-credentials
assert-user-credentials

curl -s -X POST -H "Content-Type: application/x-www-form-urlencoded" -d "grant_type=password&client_id=$CLIENT_ID&client_secret=$CLIENT_SECRET&username=$USERNAME&password=$PASSWORD" "https://authentication.gettyimages.com/oauth2/token"
