using Travel.Business.Foursquare;
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
                cityManager.UpdateCity(city);
            }

            return true;
        }
    }
}
