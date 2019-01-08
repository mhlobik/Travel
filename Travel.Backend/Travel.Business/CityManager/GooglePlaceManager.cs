using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Travel.Database.Model;

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

                if (status.Equals("ZERO_RESULTS"))
                {
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

        public async Task<List<Hotel>> GetHotels(string cityName)
        {
            var lines = System.IO.File.ReadAllLines(@"D:\Diplomski Rad\config.ts");
            string appSecret = lines[0];

            Client = new System.Net.Http.HttpClient();
            Client.BaseAddress = new Uri("https://maps.googleapis.com/maps/api/place/");

            var hotels = new List<Hotel>();

            var query = "hotels in " + cityName;

            var resp = await Client.GetAsync(string.Format("textsearch/json?query={0}&key={1}", query, appSecret));

            if (resp.IsSuccessStatusCode)
            {
                var results = JObject.Parse(Task.Run(async () => await resp.Content.ReadAsStringAsync()).ConfigureAwait(false).GetAwaiter().GetResult());
                JArray resultsArray = (JArray)results["results"];
                System.Console.WriteLine($"\nUkupno rezultata za hotele {cityName} : {resultsArray.Count}\n");

                foreach (var result in resultsArray)
                {
                    var placeId = result["place_id"].ToString();
                    var hotel = await getHotelDetails(appSecret, placeId);
                    hotels.Add(hotel);
                }
            }

            return hotels;
        }

        private async Task<Hotel> getHotelDetails(string appSecret, string placeId)
        {
            var hotel = new Hotel();
            var details = await Client.GetAsync(String.Format("details/json?key={0}&placeid={1}", appSecret, placeId));

            if (details.IsSuccessStatusCode)
            {
                var content = JObject.Parse(await details.Content.ReadAsStringAsync());
                var result = content["result"];

                hotel.HotelId = result["id"] != null ? result["id"].ToString() : "";
                hotel.Address = result["formatted_address"] != null ? result["formatted_address"].ToString() : "";
                hotel.Name = result["name"] != null ? result["name"].ToString() : "";
                hotel.GoogleMapsUrl = result["url"] != null ? result["url"].ToString() : "";
                hotel.UserRating = result["rating"] != null ? result["rating"].ToString() : "";
                hotel.Website = result["website"] != null ? result["website"].ToString() : "";
            }

            return hotel;
        }
    }
}