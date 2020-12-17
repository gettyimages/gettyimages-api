# Auth Code sample - ASP.NET Core in .NET 5 MVC

This is a sample ASP.NET Core in .NET 5 MVC app that shows, as simply as possible, the steps needed to get an access token and refresh token with the [OAuth 2 Authorization Code flow](https://developer.gettyimages.com/api/oauth2.html).

Most of the code that illustrates how to work with authorization is in [`AuthController`](AuthCodeWebAppMVC/Controllers/AuthController.cs).

## Basic steps

- Ensure you have a working ASP.NET Core in .NET 5 development environment on your machine
- Fill in `Secrets:ApiKey` and `Secrets:ApiSecret` in [`appsettings.Development.json`](AuthCodeWebAppMVC/appsettings.Development.json) with your Getty API key and secret
- Run the app
  - From Visual Studio or JetBrains Rider, load the solution and hit F5 or Ctrl-F5
  - From the CLI: `dotnet run --project code-samples/dotnet/AuthCodeWebAppMVC/AuthCodeWebAppMVC/AuthCodeWebAppMVC.csproj`
- Go to [`http://localhost:5000`](http://localhost:5000)
  - If you are already binding port 5000, modify `BaseUrl` in `Program.cs` to use an un-bound port
- Click the "Start auth code authentication" link
- Log in with a username and password when prompted
- Observe the tokens are returned and displayed in a view in the app
