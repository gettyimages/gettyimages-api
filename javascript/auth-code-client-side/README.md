# Authorization Code Sample

This is a fully client-side implementation of the OAuth 2.0
Authorization Code Grant. It's meant to be a reference implementation of
using the Getty API with users using their own Getty or iStock
credentials.

This form of Authorization Code does not use a client secret. It does
make use of the [PKCE](https://datatracker.ietf.org/doc/html/rfc7636)
extension to aid in keeping the access token secure from any malicious
scripts or apps on the user's device.

This project does not rely on _any_ third-party libraries or packages.

## Running locally

After cloning this repository, the simplest way to test it out is by
using [Docker](https://docs.docker.com/get-docker/).

```sh
git clone https://github.com/gettyimages/gettyimages-api.git
cd gettyimages-api/javascript/auth-code-client-side
make
```

Once the nginx container starts up...

1. Open a browser and navigate to
<http://localhost:8080>.
1. Enter your API Key in the box and click _Set API Key_.
1. Click _Login_, you will be prompted for your Getty or iStock user
   credentials.
1. Your browser will be redirected, and you should then see some photos
   of dogs.

When you are finished trying it out type:

```sh
make stop
```

This will stop the nginx container and delete it.

## Details

The application uses local and session storage to store things like the
API Key you entered and the access and refresh tokens retrieved. This
way you can see how things work between browser sessions. Once you've
logged in, you can navigate back to the main page and click on _Use
refresh token_ which will get a new access token using the stored
refresh token and then redirect to the search results page once again.
