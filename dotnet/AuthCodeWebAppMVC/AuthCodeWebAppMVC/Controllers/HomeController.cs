using Microsoft.AspNetCore.Mvc;

namespace AuthCodeWebAppMVC.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}