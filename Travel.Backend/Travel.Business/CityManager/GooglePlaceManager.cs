using Newtonsoft.Json.Linq;
using System;
using System.Threading.Tasks;

namespace Travel.Business.CityManager
{
    public class GooglePlaceManager
    {
        private static System.Net.Http.HttpClient Client { get; set; }
        private static string baseUrl = "https://maps.googleapis.com/maps/api/place/";

        public async Task<string> GetImage(string name)
        {
            Client = new System.Net.Http.HttpClient();
            Client.BaseAddress = new Uri(baseUrl);
            string photoUrl = null;

            var lines = System.IO.File.ReadAllLines(@"D:\Diplomski Rad\config.ts");
            string appSecret = lines[0];

            var resp = await Client.GetAsync(string.Format("textsearch/json?key={0}&query={1}", appSecret, name));
            if (resp.IsSuccessStatusCode)
            {
                var result = JObject.Parse(await resp.Content.ReadAsStringAsync());
                var status = result["status"].ToString();

                if (status.Equals("ZERO_RESULTS")) {
                    return null;
                }

                var photos = result["results"][0]["photos"];

                if (photos != null)
                {
                    var photoReference = photos[0]["photo_reference"];
                    var maxHeight = photos[0]["height"];
                    var maxWidth = photos[0]["width"];
                    photoUrl = String.Format("{0}photo?photoreference={1}&sensor=false&maxheight={2}&maxwidth={3}&key={4}", baseUrl, photoReference, maxHeight, maxWidth, appSecret);
                }
                else
                {
                    return null;
                }
            }

            return photoUrl;
        }
    }
}
