using Travel.Business.CityManager;
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
    }
}
