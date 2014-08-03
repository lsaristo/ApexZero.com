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
        String connString = 
            ConfigurationManager
            .ConnectionStrings["PrimaryDB"]
            .ConnectionString;

        public String[] getGameMessages()
        {
            String query = "select id,message from [PsychOfSleep].dbo.tblGame";
            String[] resultString = new String[15];

            using(SqlConnection conn = new SqlConnection(connString)) {
                SqlCommand cmd = new SqlCommand(query, conn);
                conn.Open();
                SqlDataReader dr = cmd.ExecuteReader();

                try {
                    while(dr.Read()) {
                        resultString[Convert.ToInt32(dr["id"])-1] = (String)dr["message"];
                    }
                } finally {
                    conn.Close();
                }
            }
            return resultString;
        }
    
        public String getArticle(int id)
        {
            String query = 
                "select contents from [PsychOfSleep].dbo.tblArticles where id = @id";
            String resultString = "";
            
            using(SqlConnection conn = new SqlConnection(connString)) {
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@id", id);
                conn.Open();
                SqlDataReader dr = cmd.ExecuteReader();

                try {
                    while(dr.Read()) {
                        resultString += dr["contents"];
                    }
                } finally {
                    conn.Close();
                }
            }
            return resultString;
        }
    }
}