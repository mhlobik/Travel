using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Travel.Database.Enums;
using Travel.Database.Model;
using Travel.Database.Utilities;

namespace Travel.Business.Utilities
{
    public class MappingDataManager
    {
        public static List<PointsOfInterestCategoriesEnum> SelectPointOfInterestsCategories(List<PointsOfInterest> userCityPointsOfInterests)
        {
            var userCityPointsOfInterestsCategories = new List<PointsOfInterestCategoriesEnum>();

            foreach (var pi in userCityPointsOfInterests)
            {
                foreach (var category in pi.Categories)
                {
                    if (userCityPointsOfInterestsCategories.Contains(category.CategoryType)) continue;
                    userCityPointsOfInterestsCategories.Add(category.CategoryType);
                }
            }

            return userCityPointsOfInterestsCategories;
        }

        public static List<CityRating> InitializeFilteredCities(Dictionary<string, RatedCityDTO> userCities)
        {
            var result = new List<CityRating>();
            foreach (var city in userCities.Values)
            {
                result.Add(city.CityRating);
            }
            return result;
        }

        public static Dictionary<string, List<CityRating>> MapCityRatingToCityIdDictionary(List<CityRating> cityRatings)
        {
            var result = new Dictionary<string, List<CityRating>>();
            var ids = cityRatings.Select(x => x.CityId).Distinct();

            foreach (var id in ids)
            {
                var key = id;
                var ratings = cityRatings.Where(x => x.CityId.Equals(id)).ToList();
                result.Add(key, ratings);
            }

            return result;
        }

        public static Dictionary<string, List<CityRating>> MapCityRatingToUserIdDictionary(List<CityRating> cityRatings)
        {
            var result = new Dictionary<string, List<CityRating>>();
            var ids = cityRatings.Select(x => x.UserId).Distinct();

            foreach (var id in ids)
            {
                var key = id;
                var ratings = cityRatings.Where(x => x.UserId.Equals(id)).ToList();
                result.Add(key, ratings);
            }

            return result;
        }
    }
}
