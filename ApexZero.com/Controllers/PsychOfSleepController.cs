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
            ViewBag.Layout = Layout;
            Models.PsychOfSleepModel m = new Models.PsychOfSleepModel();

            if(articleId == -1) {
                List<Models.PsychOfSleepModel.Article> arts = 
                    m.getAllArticles();

                ViewBag.articleTitle = "All articles:";
                ViewBag.articleBody = "<table class=\"xxd\">";
                ViewBag.articleBody += "<tr><td>Title</td></tr>";

                foreach(Models.PsychOfSleepModel.Article e in arts) {
                    ViewBag.articleBody += 
                        "<td><a href=\"/PsychOfSleep/StyleDemo?articleId="
                        +e.id+"\">" + e.title + "</a></td></tr>";
                }
                ViewBag.articleBody += "</table>";
                return View();
            }


            try { 
                Models.PsychOfSleepModel.Article result 
                    = m.getArticle((int)articleId);
                ViewBag.articleTitle = result.title;
                ViewBag.articleBody = result.body;
                ViewBag.articleURL = result.url;
            } catch(Exception) {
                ViewBag.articleTitle =
                    "<div class='err' id='noscript'>ERROR: Invalid Article ID";
                ViewBag.articleBody = "<a href='/PsychOfSleep'>Back Home</a></div>";
            }
            return View();
        }

        //
        // GET: /PsychOfSleep/SleepGame
        public ActionResult SleepGame()
        {
            String messages = "";
            List<Models.PsychOfSleepModel.GameMessage> db_messages = 
                (new Models.PsychOfSleepModel()).getGameMessages();

            foreach(Models.PsychOfSleepModel.GameMessage msg in db_messages) {
                if(msg.id != null) {
                    messages 
                        += msg.id + "^"
                        + msg.message + "^"
                        + msg.url + "~";
                }
            }
            ViewBag.messages = messages;
            ViewBag.Layout = Layout;
            return View();
        }
    }
}
