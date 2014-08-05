using System;
using System.Configuration;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;

namespace ApexZero.com.Models
{
    public class PsychOfSleepModel
    {
        public struct Article
        {
            public String title;
            public String body;
            public int id;
        }

        public struct GameMessage
        {
            public String message;
            public String url;
            public int id;
        }

        String connString = 
            ConfigurationManager
            .ConnectionStrings["PrimaryDB"]
            .ConnectionString;

        public List<GameMessage> getGameMessages()
        {
            String query = "select id,message,url from [PsychOfSleep].dbo.tblGame";
            List<GameMessage> messages = new List<GameMessage>();

            using(SqlConnection conn = new SqlConnection(connString)) {
                SqlCommand cmd = new SqlCommand(query, conn);
                conn.Open();
                SqlDataReader dr = cmd.ExecuteReader();

                try {
                    while(dr.Read()) {
                        messages.Add(
                            new GameMessage() { 
                                id = Convert.ToInt32(dr["id"]), 
                                message = (String)dr["message"], 
                                url = (String)dr["url"]
                            }
                        );
                    }
                } finally {
                    conn.Close();
                }
            }
            return messages;
        }

        public List<Article> getAllArticles()
        {
            List<Article> outArts = new List<Article>();
            String query = 
                "select id,title from [PsychOfSleep].dbo.tblArticles";
            
            using(SqlConnection conn = new SqlConnection(connString)) {
                SqlCommand cmd = new SqlCommand(query, conn);
                conn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                
                if(!dr.HasRows) {
                    throw new Exception();
                }

                try {
                    while(dr.Read()) {
                        outArts.Add(
                            new Article() {
                                id = Convert.ToInt32(dr["id"]),
                                title = (String)dr["title"]
                            }
                        );
                    }
                } finally {
                    conn.Close();
                }
            }
            return outArts;
        }
    
        public Article getArticle(int id)
        {
            Article outArticle = new Article();
            outArticle.title = "";
            outArticle.body = "";
            String query = 
                "select title,contents from [PsychOfSleep].dbo.tblArticles where id = @id";
            
            using(SqlConnection conn = new SqlConnection(connString)) {
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@id", id);
                conn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                
                if(!dr.HasRows) {
                    throw new Exception();
                }

                try {
                    while(dr.Read()) {
                        outArticle.title += dr["title"];
                        outArticle.body += dr["contents"];
                    }
                } finally {
                    conn.Close();
                }
            }
            return outArticle;
        }
    }
}