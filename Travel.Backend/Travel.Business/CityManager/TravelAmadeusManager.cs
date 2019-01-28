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
            var cityDataManager = new ManageCityData();

            var origin = flightInfo.Origin.Length != 3 ? cityDataManager.GetCityAirport(flightInfo.Origin).IATA : flightInfo.Origin; //"LON";
            var destination = flightInfo.Destination.Length != 3 ? cityDataManager.GetCityAirport(flightInfo.Destination).IATA : flightInfo.Destination;//"NYC";


            var departureDate = flightInfo.DepartureDate.Date.ToString("yyyy-MM-dd"); //"2019-01-08"; //
            var returnDate = flightInfo.ReturnDate.Date.ToString("yyyy-MM-dd"); //"2019-01-11"; //

            var resp = await flightClient.GetAsync(string.Format("?apikey={0}&origin={1}&destination={2}&departure_date={3}&return_date={4}", flightsApiKey, origin, destination, departureDate, returnDate));
            if (resp.IsSuccessStatusCode)
            {
                var results = JObject.Parse(Task.Run(async () => await resp.Content.ReadAsStringAsync()).ConfigureAwait(false).GetAwaiter().GetResult());
                JArray resultsArray = (JArray)results["results"];
                System.Console.WriteLine($"\nUkupno rezultata za letove {resultsArray.Count}");
                if(resultsArray.Count > 0)
                {
                    for (var i = 0; i < 5; i++)
                    {
                        var flight = mapResultToFlightViewModel(flightInfo.Origin.Length == 3 ? cityDataManager.GetCityAirport(flightInfo.Origin).City : flightInfo.Origin, flightInfo.Destination.Length == 3 ? cityDataManager.GetCityAirport(flightInfo.Destination).City : flightInfo.Destination, resultsArray[i]);
                        flights.Add(flight);
                    }
                }
            }

            return flights.OrderByDescending(x=>x.TotalPrice).Distinct().ToList();
        }

        private FlightViewModel mapResultToFlightViewModel(string origin, string destination, JToken result)
        {
            return new FlightViewModel()
            {
                From = "Zagreb",//origin,
                To = "Hayman Island",//destination,
                Currency = result["fare"]["currency"].ToString(),
                TotalPrice = (decimal)result["fare"]["total_price"],
                OutboundDuration = result["outbound"]["duration"].ToString(),
                InboundDuration = result["inbound"]["duration"].ToString(),
                Link = result["deep_link"].ToString(),
            };
        }
    }
}
