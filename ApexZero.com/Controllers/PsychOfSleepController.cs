using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ApexZero.com.Controllers
{
    public class PsychOfSleepController : Controller
    {
        String Layout = "/Views/PsychOfSleep/SubLayout.cshtml";
        
        //
        // GET: /PsychOfSleep/
        public ActionResult Index()
        {
            ViewBag.Layout = "~/Views/PsychOfSleep/IndexLayout.cshtml";
            return View();
        }

        //
        // GET: /PsychOfSleep/FW
        public ActionResult FW()
        {
            ViewBag.Layout = Layout;
            return View();
        }

        //
        // GET: /PsychOfSleep/StyleDemo
        public ActionResult StyleDemo()
        {
            ViewBag.Layout = Layout;
            return View();
        }
    }
}
