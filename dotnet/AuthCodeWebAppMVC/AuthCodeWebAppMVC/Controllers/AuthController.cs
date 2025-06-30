using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using AuthCodeWebAppMVC.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace AuthCodeWebAppMVC.Controllers
{
    public class AuthController : Controller
    {
        private readonly IConfiguration _configuration;

        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private string ApiKey => _configuration["Secrets:ApiKey"];

        private string ApiSecret => _configuration["Secrets:ApiSecret"];
        
        // We hard-code the code_verifier here only for a simple example.
        // A production app should be using newly-created values for each
        // unique auth code flow attempt.
        // See the PKCE RFC for specific information on this:
        // https://tools.ietf.org/html/rfc7636#section-4.1
        private const string CodeVerifier = "xnQ42e5Ee-fb17_47ad-A57f-903A_487a-81f9-63e701f7290f";

        private const string RedirectUrl = Program.BaseUrl + "/Auth/Receiver";

        [HttpGet]
        public IActionResult StartAuthCodeFlow()
        {
            string codeChallenge = GetCodeChallenge();
            string url =
                $"https://authentication.gettyimages.com/oauth2/auth?client_id={ApiKey}&response_type=code&state=datasentfromclient&redirect_uri={System.Net.WebUtility.UrlEncode(RedirectUrl)}&code_challenge={codeChallenge}&code_challenge_method=S256";
            return Redirect(url);
        }

        [HttpGet]
        public async Task<IActionResult> Receiver(string code)
        {
            // Note: new-ing up an HttpClient like this should not be done in a production app. This is just to keep the example simple.
            using (var client = new HttpClient())
            {
                var formData = new List<KeyValuePair<string, string>>
                {
                    new KeyValuePair<string, string>("grant_type", "authorization_code"),
                    new KeyValuePair<string, string>("client_id", ApiKey),
                    new KeyValuePair<string, string>("client_secret", ApiSecret),
                    new KeyValuePair<string, string>("code", code),
                    new KeyValuePair<string, string>("redirect_uri", RedirectUrl),
                    new KeyValuePair<string, string>("code_verifier", CodeVerifier)
                };

                var req = new HttpRequestMessage(HttpMethod.Post, "https://authentication.gettyimages.com/oauth2/token")
                {
                    Content = new FormUrlEncodedContent(formData)
                };

                var result = await client.SendAsync(req);

                var content = await result.Content.ReadAsStringAsync();

                var token = JsonSerializer.Deserialize<Token>(content);

                return View(token);
            }
        }

        private string GetCodeChallenge()
        {
            using (var sha = SHA256.Create())
            {
                var bytes = Encoding.ASCII.GetBytes(CodeVerifier);
                var hash = sha.ComputeHash(bytes);
                return Base64UrlEncode(hash);
            }
        }

        // https://tools.ietf.org/html/rfc7636#appendix-A
        private static string Base64UrlEncode(byte[] arg)
        {
            string s = Convert.ToBase64String(arg); // Regular base64 encoder
            s = s.Split('=')[0]; // Remove any trailing '='s
            s = s.Replace('+', '-'); // 62nd char of encoding
            s = s.Replace('/', '_'); // 63rd char of encoding
            return s;
        }
    }
}