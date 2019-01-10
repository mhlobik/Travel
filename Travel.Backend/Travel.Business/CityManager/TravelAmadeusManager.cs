using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Travel.Database.Model;
using Travel.Database.Utilities;

namespace Travel.Business.CityManager
{
    public class TravelAmadeusManager
    {
        public async Task<List<FlightViewModel>> GetFlights(FlightDTO flightInfo)
        {
            var lines = System.IO.File.ReadAllLines(@"D:\Diplomski Rad\config.ts");
            string flightsApiKey = lines[3];

            var flightClient = new System.Net.Http.HttpClient();
            flightClient.BaseAddress = new Uri("https://api.sandbox.amadeus.com/v1.2/flights/affiliate-search");

            var flights = new List<FlightViewModel>();

            var origin = flightInfo.Origin; //"LON";
            var destination = flightInfo.Destination; //"NYC";

            var departureDate = flightInfo.DepartureDate.Date.ToString("yyyy-MM-dd"); //"2019-01-08"; //
            var returnDate = flightInfo.ReturnDate.Date.ToString("yyyy-MM-dd"); //"2019-01-11"; //

            var resp = await flightClient.GetAsync(string.Format("?apikey={0}&origin={1}&destination={2}&departure_date={3}&return_date={4}", flightsApiKey, origin, destination, departureDate, returnDate));
            if (resp.IsSuccessStatusCode)
            {
                var results = JObject.Parse(Task.Run(async () => await resp.Content.ReadAsStringAsync()).ConfigureAwait(false).GetAwaiter().GetResult());
                JArray resultsArray = (JArray)results["results"];
                System.Console.WriteLine($"\nUkupno rezultata za letove {resultsArray.Count}");
                
                foreach(var result in resultsArray)
                {
                    var flight = mapResultToFlightViewModel(origin, destination, result);
                    flights.Add(flight);
                }
            }

            return flights;
        }

        private FlightViewModel mapResultToFlightViewModel(string origin, string destination, JToken result)
        {
            return new FlightViewModel()
            {
                From = origin,
                To = destination,
                Currency = result["fare"]["currency"].ToString(),
                TotalPrice = (decimal)result["fare"]["total_price"],
                OutboundDuration = result["outbound"]["duration"].ToString(),
                InboundDuration = result["inbound"]["duration"].ToString(),
                Link = result["deep_link"].ToString(),
            };
        }
    }
}
