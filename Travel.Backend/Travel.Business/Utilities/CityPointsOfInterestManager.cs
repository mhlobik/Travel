using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Travel.Business.CityManager;
using Travel.Database.Model;
using Travel.Database.Utilities;

namespace Travel.Business.Utilities
{
    public class CityPointsOfInterestManager
    {
        public bool GetCityPointsOfInterest(int n, int m)
        {
            var cityManager = new ManageCityData();
            var cities = cityManager.GetCities(n, m);

            var forusquare = new FoursquareManager();

            foreach (var city in cities)
            {
                city.PointsOfInterest = forusquare.GetVenuesForCity(city.Name);
                cityManager.UpdateCityPointsOfInterest(city);
            }

            return true;
        }

        public async Task<List<CarouselDataDTO>> GetPointOfInterestsImages(City city)
        {
            var result = new List<CarouselDataDTO>();
            var manager = new GooglePlaceManager();
            var updatedPI = new List<PointsOfInterest>();

            var i = 0;
            var url = "";
            foreach (var pi in city.PointsOfInterest)
            {
                if(pi.Url == null)
                {
                    url = await manager.GetImage(pi.Name + " " + city.Name);
                    if (url == null) continue;
                }

                i++;

                result.Add( new CarouselDataDTO()
                {
                    Image = pi.Url ?? url,
                    Title = pi.Name
                });

                updatedPI.Add(new PointsOfInterest()
                {
                    Categories = pi.Categories,
                    Name = pi.Name,
                    Description = pi.Description,
                    Id = pi.Id
                });

                Console.WriteLine($"{i}/{city.PointsOfInterest.Count}: dohvatio { pi.Name}");
            }


            //save image to db
            var updatedCity = new City()
            {
                CityId = city.CityId,
                Country = city.Country,
                Description = city.Description,
                Flights = city.Flights,
                Hotels = city.Hotels,
                Name = city.Name,
                PointsOfInterest = updatedPI
            };

            var cityManager = new ManageCityData();
            cityManager.UpdateCityPointsOfInterest(updatedCity);

            return result;
        }
    }
}
