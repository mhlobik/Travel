using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Travel.Database.Model;

namespace Travel.Business.CityManager
{
    public class WikipediaManager
    {
        public string GetCityDescription(string cityName)
        {
            var wikiClient = new System.Net.Http.HttpClient();
            var wikiResponseSummary = JObject.Parse(
                Task.Run(
                    async () =>
                    await wikiClient.GetStringAsync(
                        string.Format("http://en.wikipedia.org/w/api.php?format=json&indexpageids=&action=query&prop=extracts&exintro&explaintext&redirects=1&titles={0}", cityName)
                        )
                ).ConfigureAwait(false).GetAwaiter().GetResult());

            var responseQuery = wikiResponseSummary["query"];
            var responsePageId = responseQuery["pageids"][0].ToString();
            var summary = responseQuery["pages"][responsePageId]["extract"].ToString();

            return summary;
        }

        public string GetCityImage(string cityName)
        {
            var wikiClient = new System.Net.Http.HttpClient();
            var wikiResponseImage = JObject.Parse(
                Task.Run(
                    async () => 
                    await wikiClient.GetStringAsync(
                        string.Format("http://en.wikipedia.org/w/api.php?action=query&indexpageids=&prop=pageimages&format=json&piprop=original&titles={0}", cityName)
                    )
                ).ConfigureAwait(false).GetAwaiter().GetResult());
            var responseQuery = wikiResponseImage["query"];
            var responsePageId = responseQuery["pageids"][0].ToString();
            var original = responseQuery["pages"][responsePageId]["original"];
            string image = null;
            if (original != null)
            {
                image = original["source"].ToString();
            }

            return image;
        }
    }
}
