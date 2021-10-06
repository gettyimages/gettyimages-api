# Getty Images API Curl Samples

The scripts in this directory use [curl](https://curl.se/) and [jq](https://stedolan.github.io/jq/) to make calls to the [Getty Images API](https://developer.gettyimages.com).

They expect a file named `credentials.sh`
to exist in the same directory. This file sets environment variables
containing your API credentials. If the file does not exist before
executing one of the scripts, a skeleton file will be created.

## Execute a search call

```
./search-images-creative.sh sunset
```

## Execute a client credentials call

```
./auth-client-credentials.sh
```
