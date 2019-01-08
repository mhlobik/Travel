using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Travel.Business.CityManager;
using Travel.Database.Model;
using Travel.Database.Utilities;

namespace Travel.Business.Utilities
{
    public class CityHotelsManager
    {
        public async Task<List<Hotel>> GetHotels(City city)
        {
            if (city.Hotels == null)
            {
                var googlePlaceManager = new GooglePlaceManager();
                var hotels = await googlePlaceManager.GetHotels(city.Name);

                if (hotels.Any())
                {
                    city.Hotels = hotels;
                    var cityManager = new ManageCityData();
                    cityManager.UpdateCityHotels(city);

                    return hotels;
                }
            }

            return city.Hotels;
        }
    }
}
