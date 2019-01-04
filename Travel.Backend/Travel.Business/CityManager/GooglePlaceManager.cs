using Newtonsoft.Json.Linq;
using System;
using System.Threading.Tasks;

namespace Travel.Business.CityManager
{
    public class GooglePlaceManager
    {

        public string GetImage(string name)
        {
            Client = new System.Net.Http.HttpClient();
            Client.BaseAddress = new Uri(baseUrl);
            string photoUrl = "";

            var resp = Task.Run(async () => await Client.GetAsync(string.Format("textsearch/json?key={0}&query={1}", appSecret, name))).ConfigureAwait(false).GetAwaiter().GetResult();
            if (resp.IsSuccessStatusCode)
            {
                var result = JObject.Parse(Task.Run(async () => await resp.Content.ReadAsStringAsync()).ConfigureAwait(false).GetAwaiter().GetResult());

                var photoReference = result["results"][0]["photos"][0]["photo_reference"];
                var maxHeight = result["results"][0]["photos"][0]["height"];
                var maxWidth = result["results"][0]["photos"][0]["width"];
                photoUrl = String.Format("{0}photo?photoreference={1}&sensor=false&maxheight={2}&maxwidth={3}&key={4}", baseUrl, photoReference, maxHeight, maxWidth, appSecret);
            }

            return photoUrl;
        }
    }
}
