using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Travel.Business.CityManager;
using Travel.Business.Utilities;
using Travel.Database.Model;
using Travel.Database.Utilities;

namespace Travel.Business.Recommenders
{
    public class SpecificRecommendations
    {
        public async Task<City> GetSpecificRecommendations(Recommendation recommendation)
        {
            System.Console.WriteLine("GetSpecificRecommendations started");
            var userDatabaseManager = new ManageUserFacebookData();
            var userProfile = userDatabaseManager.GetUserProfile(recommendation.UserId);

            var flightInfo = new FlightDTO();

            DateTime start, end;
            if (userProfile.MonthPartSelected.Equals("1"))
            {
                start = new DateTime(2019, userProfile.MonthSelected, 1);
                end = new DateTime(2019, userProfile.MonthSelected, 28);
            }
            else
            {
                start = new DateTime(2019, userProfile.MonthSelected, 15);
                end = new DateTime(2019, userProfile.MonthSelected, 28);
            }

            var travelManager = new TravelAmadeusManager();
            var flights = new List<FlightViewModel>();
            for (var departure = start; departure <= end; departure = departure.AddDays(1))
            {
                flightInfo = new FlightDTO()
                {
                    Origin = userProfile.LocationName,
                    Destination = recommendation.RecommendedCity.Name,
                    DepartureDate = departure,
                    ReturnDate = departure.AddDays(userProfile.Duration) <= end ? departure.AddDays(userProfile.Duration) : end
                };

                var results = await travelManager.GetFlights(flightInfo);
                flights.AddRange(results);
                if (results.Count == 0) break;
            }

            var recommendedFlights = new List<FlightViewModel>();
            if (userProfile.MaxFlightPrice != 0)
            {
                foreach (var flight in flights)
                {
                    if (flight.TotalPrice <= userProfile.MaxFlightPrice)
                    {
                        recommendedFlights.Add(flight);
                    }

                }
            }
            else
            {
                recommendedFlights = flights.OrderBy(x => x.TotalPrice).Take(3).ToList();
            }

            var hotelsManager = new CityHotelsManager();
            var hotels = await hotelsManager.GetHotels(recommendation.RecommendedCity);
            var recommendedHotels = hotels.OrderByDescending(x => x.UserRating).Take(3).ToList();

            var specificRecommendation = recommendation.RecommendedCity;
            specificRecommendation.Flights = recommendedFlights.Count != 0 ? recommendedFlights : getFlights(userProfile.LocationName, recommendation.RecommendedCity.Name);
            specificRecommendation.Hotels = recommendedHotels;
            System.Console.WriteLine("GetSpecificRecommendations finished");
            return specificRecommendation;
        }

        private List<FlightViewModel> getFlights(string from, string to)
        {
            return new List<FlightViewModel>(){
                new FlightViewModel()
                {
                    Currency = "EUR",
                    From = from,
                    To = to,
                    InboundDuration = "13:20",
                    OutboundDuration = "12:50",
                    TotalPrice = (decimal)674.64,
                    Link = "https://track.connect.travelaudience.com/dlv/verify_jwt/?params=eyJhbGciOiJIUzI1NiJ9.eyJhZmZfaWQiOjEwMTYsInVybCI6Imh0dHA6Ly9pb3A0LmFpcmV1cm9wYS5jb20vZHluY2xpY2svYWlyZXVyb3BhLz9ldGYtcHVibGlzaGVyPXRyYXZlbGF1ZGllbmNlLVVTJmV0Zi1uYW1lPXRyYXZlbGF1ZGllbmNlLWNvcmUtVVMtTGFyZ2EtdHJhdmVsYXVkaWVuY2UtVVMmZXRmLXByZHJlZj1MR1dOWUMmZXRmLW1lZGlhcGxhbj1VUyZldXJsPWh0dHBzJTI1M0ElMjUyRiUyNTJGd3d3LmFpcmV1cm9wYS5jb20lMjUyRmVuJTI1MkZmbGlnaHRzJTI1MkZmbGlnaHRzJTI1M0Z1dG1fc291cmNlJTI1M0RUcmF2ZWxhdWRpZW5jZV9VUyUyNTI2dXRtX2NhbXBhaWduJTI1M0RUcmF2ZWxhdWRpZW5jZV9jb3JlX1VTX0xhcmdhX0xHV19OWUMlMjUyNnV0bV9tZWRpdW0lMjUzRG1ldGFidXNjYWRvcmVzJTI1MjMlMjUyRmZsaWdodHMlMjUyRmZyb20lMjUyRkxHVyUyNTJGdG8lMjUyRk5ZQyUyNTJGb3clMjUyRjA3LTE4LTIwMTklMjUyRmFkdWx0cyUyNTJGMSUyNTJGcnQlMjUyRjA3LTIzLTIwMTklMjUyRmtpZHMlMjUyRjAlMjUyRmJhYmllcyUyNTJGMCUyNTJGcmVzaWRlbnQlMjUyRmZhbHNlJTI1MkZidXNpbmVzcyUyNTJGZmFsc2UlMjUyRmNoYW5uZWwlMjUyRlRBQyUyNTJGbWt0JTI1MkZ1cyUyNTJGbGFuZyUyNTJGZW4mcHJlZmVycmVkX2xhbmRpbmdfcGFnZT1zZWFyY2hfcmVzdWx0cyZ0YW5zZWw9VmpKOFZWZ3hNREUwTEU1UFFrRkhMVlZZT1RFc1RrOUNRVWRlVlZnNU1peE9UMEpCUnkxVldERXdNVFVzVGs5Q1FVZDhOamMwTGpZMGZFVlZVbnhqTldWalpEWmtaaTAxTWpNM0xUUTJOR1V0WVdWbE1pMWxZbVZsTXpBd05qTTBNVEY4VlZnJTNEIiwib2ZmZXJfaWQiOiIyNiJ9.iXU7couJ5OJDzQDbxrnV88R01TfgeIqy_fh7DEr2ITE"
                },
                                new FlightViewModel()
                                {
                                    Currency = "EUR",
                                    From = from,
                                    To = to,
                                    InboundDuration = "13:10",
                                    OutboundDuration = "12:30",
                                    TotalPrice = (decimal)681.24,
                                    Link = "https://track.connect.travelaudience.com/dlv/verify_jwt/?params=eyJhbGciOiJIUzI1NiJ9.eyJhZmZfaWQiOjEwMTYsInVybCI6Imh0dHA6Ly9pb3A0LmFpcmV1cm9wYS5jb20vZHluY2xpY2svYWlyZXVyb3BhLz9ldGYtcHVibGlzaGVyPXRyYXZlbGF1ZGllbmNlLVVTJmV0Zi1uYW1lPXRyYXZlbGF1ZGllbmNlLWNvcmUtVVMtTGFyZ2EtdHJhdmVsYXVkaWVuY2UtVVMmZXRmLXByZHJlZj1MR1dOWUMmZXRmLW1lZGlhcGxhbj1VUyZldXJsPWh0dHBzJTI1M0ElMjUyRiUyNTJGd3d3LmFpcmV1cm9wYS5jb20lMjUyRmVuJTI1MkZmbGlnaHRzJTI1MkZmbGlnaHRzJTI1M0Z1dG1fc291cmNlJTI1M0RUcmF2ZWxhdWRpZW5jZV9VUyUyNTI2dXRtX2NhbXBhaWduJTI1M0RUcmF2ZWxhdWRpZW5jZV9jb3JlX1VTX0xhcmdhX0xHV19OWUMlMjUyNnV0bV9tZWRpdW0lMjUzRG1ldGFidXNjYWRvcmVzJTI1MjMlMjUyRmZsaWdodHMlMjUyRmZyb20lMjUyRkxHVyUyNTJGdG8lMjUyRk5ZQyUyNTJGb3clMjUyRjA3LTIzLTIwMTklMjUyRmFkdWx0cyUyNTJGMSUyNTJGcnQlMjUyRjA3LTI4LTIwMTklMjUyRmtpZHMlMjUyRjAlMjUyRmJhYmllcyUyNTJGMCUyNTJGcmVzaWRlbnQlMjUyRmZhbHNlJTI1MkZidXNpbmVzcyUyNTJGZmFsc2UlMjUyRmNoYW5uZWwlMjUyRlRBQyUyNTJGbWt0JTI1MkZ1cyUyNTJGbGFuZyUyNTJGZW4mcHJlZmVycmVkX2xhbmRpbmdfcGFnZT1zZWFyY2hfcmVzdWx0cyZ0YW5zZWw9VmpKOFZWZ3hNREUwTEU1UFFrRkhMVlZZT1RFc1RrOUNRVWRlVlZnNU1peE9UMEpCUnkxVldERXdNVFVzVGs5Q1FVZDhOamMwTGpZMGZFVlZVbnhsTVdZd09XUTRZaTAxT0RaaUxUUm1aakl0T1RFMFlTMHdZMkV3WkRJMk1tUTJNRGw4VlZnJTNEIiwib2ZmZXJfaWQiOiIyNiJ9.MOwkEab2tqEIPzwiR3HYKnW2hgHfVLFAP77rpVvBQy8"
                                },
                                                new FlightViewModel()
                                                {
                                                    Currency = "EUR",
                                                    From = from,
                                                    To = to,
                                                    InboundDuration = "13:40",
                                                    OutboundDuration = "12:20",
                                                    TotalPrice = (decimal)691.73,
                                                    Link = "https://track.connect.travelaudience.com/dlv/verify_jwt/?params=eyJhbGciOiJIUzI1NiJ9.eyJhZmZfaWQiOjEwMTYsInVybCI6Imh0dHA6Ly9pb3A0LmFpcmV1cm9wYS5jb20vZHluY2xpY2svYWlyZXVyb3BhLz9ldGYtcHVibGlzaGVyPXRyYXZlbGF1ZGllbmNlLVVTJmV0Zi1uYW1lPXRyYXZlbGF1ZGllbmNlLWNvcmUtVVMtTGFyZ2EtdHJhdmVsYXVkaWVuY2UtVVMmZXRmLXByZHJlZj1MR1dOWUMmZXRmLW1lZGlhcGxhbj1VUyZldXJsPWh0dHBzJTI1M0ElMjUyRiUyNTJGd3d3LmFpcmV1cm9wYS5jb20lMjUyRmVuJTI1MkZmbGlnaHRzJTI1MkZmbGlnaHRzJTI1M0Z1dG1fc291cmNlJTI1M0RUcmF2ZWxhdWRpZW5jZV9VUyUyNTI2dXRtX2NhbXBhaWduJTI1M0RUcmF2ZWxhdWRpZW5jZV9jb3JlX1VTX0xhcmdhX0xHV19OWUMlMjUyNnV0bV9tZWRpdW0lMjUzRG1ldGFidXNjYWRvcmVzJTI1MjMlMjUyRmZsaWdodHMlMjUyRmZyb20lMjUyRkxHVyUyNTJGdG8lMjUyRk5ZQyUyNTJGb3clMjUyRjA3LTI0LTIwMTklMjUyRmFkdWx0cyUyNTJGMSUyNTJGcnQlMjUyRjA3LTI4LTIwMTklMjUyRmtpZHMlMjUyRjAlMjUyRmJhYmllcyUyNTJGMCUyNTJGcmVzaWRlbnQlMjUyRmZhbHNlJTI1MkZidXNpbmVzcyUyNTJGZmFsc2UlMjUyRmNoYW5uZWwlMjUyRlRBQyUyNTJGbWt0JTI1MkZ1cyUyNTJGbGFuZyUyNTJGZW4mcHJlZmVycmVkX2xhbmRpbmdfcGFnZT1zZWFyY2hfcmVzdWx0cyZ0YW5zZWw9VmpKOFZWZ3hNREUwTEU1UFFrRkhMVlZZT1RFc1RrOUNRVWRlVlZnNU1peE9UMEpCUnkxVldERXdNVFVzVGs5Q1FVZDhOamMwTGpZMGZFVlZVbnc1TVdRME5tSmpZUzB5Tm1WakxUUTBaalF0T1Rsa05DMHdNMkl3TnpoaVlUSmhaREI4VlZnJTNEIiwib2ZmZXJfaWQiOiIyNiJ9.hSQC5ro39cCDLMTw1czuVz4eDMRk7m4epZRQsRBFlN0"
                                                }
            };
        }
    }
}
