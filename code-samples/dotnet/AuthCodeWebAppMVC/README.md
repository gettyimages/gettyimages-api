# Auth Code sample - ASP.NET 5 MVC

This is a sample ASP.NET 5 MVC app that shows, as simply as possible, the steps needed to get an access token and refresh token with the [OAuth 2 Authorization Code flow](https://developer.gettyimages.com/api/oauth2.html).

## Basic steps

- Ensure you have a working ASP.NET 5 development environment on your machine
- Fill in `ApiKey` and `ApiSecret` in [`AuthController`](dotnet/AuthCodeWebAppMVC/AuthCodeWebAppMVC/Controllers/AuthController.cs) with your Getty API key and secret
- Run the app
- Click the "Start auth code authentication" link
- Log in with a username and password when prompted
- Observe the tokens are returned and displayed in a view in the app