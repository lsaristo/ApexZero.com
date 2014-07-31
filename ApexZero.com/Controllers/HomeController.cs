using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ApexZero.com.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/
        public ActionResult Index()
        {
            ViewBag.MOTD = "This site is currently under development...";
            ViewBag.Title = "Apex Zero";
            return View();
        }
    }
}
