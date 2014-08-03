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
        // GET: /PsychOfSleep/StyleDemo
        public ActionResult StyleDemo(int? articleId)
        {
            Models.PsychOfSleepModel m = new Models.PsychOfSleepModel();

            if(articleId == -1 || articleId == null) {
                ViewBag.RequestedContent += "<h1>List of articles requested</h1>";
            } else {
                ViewBag.RequestedContent += m.getArticle((int)articleId);
            }
            ViewBag.Layout = Layout;
            return View();
        }

        //
        // GET: /PsychOfSleep/SleepGame
        public ActionResult SleepGame()
        {
            String messages = "";
            String[] db_messages = 
                (new Models.PsychOfSleepModel()).getGameMessages();

            foreach(String msg in db_messages) {
                if(msg != null) {
                    messages += msg + "~";
                }
            }

            ViewBag.messages = messages;
            ViewBag.Layout = Layout;
            return View();
        }
    }
}
