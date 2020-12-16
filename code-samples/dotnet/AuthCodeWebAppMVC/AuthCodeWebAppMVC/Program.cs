using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace AuthCodeWebAppMVC
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        // We use plain HTTP for this sample app to allow for ease of use,
        // but it is recommended that you still use HTTPS/TLS for
        // local development of your actual application.
        // Redirect URLs other than localhost MUST use HTTPS/TLS when
        // integrating with Getty API authentication. 
        public const string BaseUrl = "http://localhost:5000";

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder => {
                    webBuilder
                        .UseUrls(BaseUrl)
                        .UseStartup<Startup>(); 
                });
    }
}