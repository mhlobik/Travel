using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Travel.Database.Enums;
using Travel.Database.Model;
using Travel.Database.Utilities;

namespace Travel.Business.Recommenders
{
    public class TopCitiesOnTravel
    {
        public List<Recommendation> GetTopCitiesOnTravel()
        {
            var recommendations = new List<Recommendation>();
           
            var sw = Stopwatch.StartNew();
            var cityDataManager = new ManageCityData();
            var cities = cityDataManager.GetAllCities();
            var cityRatings = cityDataManager.GetAllCityRatings();

            Console.WriteLine("Stopwatch - get all cities: {0}", sw.ElapsedMilliseconds);

            var sortedAverageCityRatingsDictionary = CalculateAverageCityRatings(cityRatings);

            Console.WriteLine("\nTopCitiesOnTravel");
            foreach (var pair in sortedAverageCityRatingsDictionary)
            {
                var recommendedCity = cities.FirstOrDefault(x => x.CityId == pair.Key);

                var recommendation = new Recommendation()
                {
                    RecommenderModel = RecommenderModelEnum.TopCitiesOnTravel,
                    RecommendedCity = recommendedCity,
                    Similarity = pair.Value
                };

                recommendations.Add(recommendation);

                Console.WriteLine("city - {0}: \t{1}", recommendation.RecommendedCity.Name, pair.Value);
            }

            return recommendations;
        }

        public Dictionary<string, double> CalculateAverageCityRatings(List<CityRating> cityRatings)
        {
            var cityAverageRatingDictionary = new Dictionary<string, double>();

            var groupedCityRatings = cityRatings.GroupBy(
                x => x.CityId,
                x => x.Rating,
                (key, value) => new { CityId = key, Ratings = value.ToList() });

            foreach (var city in groupedCityRatings)
            {
                var sum = 0;
                foreach(var value in city.Ratings)
                {
                    sum += value;
                }

                cityAverageRatingDictionary.Add(city.CityId, sum / city.Ratings.Count);
            }

            var sortedCitySimilarityDictionary = from pair in cityAverageRatingDictionary
                                                 where pair.Value > 1
                                                 orderby pair.Value descending
                                                 select pair;

            return sortedCitySimilarityDictionary.Take(200).ToDictionary(kvp => kvp.Key, kvp => kvp.Value);
        }
    }
}
