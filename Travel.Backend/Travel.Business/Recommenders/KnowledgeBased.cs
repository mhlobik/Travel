using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Travel.Business.CityManager;
using Travel.Database.Enums;
using Travel.Database.Model;
using Travel.Database.Utilities;

namespace Travel.Business.Recommenders
{
    public class KnowledgeBased
    {
        public List<Recommendation> GetKnowledgeBasedRecommendations(string userId)
        {
            var recommendations = new List<Recommendation>();
            var userDataManager = new ManageUserFacebookData();
            var userProfile = userDataManager.GetUserProfile(userId);

            var cityDataManager = new ManageCityData();
            var cities = cityDataManager.GetAllCities();

            var sortedCitySimilarityDictionary = CalculateSimilarity(cities, userProfile);

            Console.WriteLine("\n");
            foreach (var pair in sortedCitySimilarityDictionary)
            {
                var recommendedCity = cities.FirstOrDefault(x => x.CityId == pair.Key);
                var wikipediaManager = new WikipediaManager();
                var cityManager = new ManageCityData();

                if (recommendedCity.ImageUrl == null)
                {
                    recommendedCity.ImageUrl = wikipediaManager.GetCityImage(recommendedCity.Name);
                    cityManager.UpdateCityImageUrl(recommendedCity);
                }

                if (recommendedCity.Description == null)
                {
                    recommendedCity.Description = wikipediaManager.GetCityDescription(recommendedCity.Name);
                    cityManager.UpdateCityDescription(recommendedCity);
                }

                var recommendation = new Recommendation()
                {
                    RecommenderModel = RecommenderModelEnum.KnowledgeBased,
                    RecommendedCity = recommendedCity,
                    Similarity = pair.Value,
                    UserId = userId
                };

                recommendations.Add(recommendation);              
            }
            Console.WriteLine("KnowledgeBased finish");
            return recommendations;
        }

        public Dictionary<string, double> CalculateSimilarity(List<City> cities, UserProfile userProfile)
        {
            var numberOfTotalUserCategories = userProfile.Preferences != null ? userProfile.Preferences.Count() : 0;

            var citySimilarityDictionary = new Dictionary<string, double>();
            foreach (var city in cities)
            {
                var numberOfEqualCategories = 0;

                if (city.ImageUrl == null)
                {
                    var wikipediaManager = new WikipediaManager();
                    city.ImageUrl = wikipediaManager.GetCityImage(city.Name);

                    var cityManager = new ManageCityData();
                    cityManager.UpdateCityImageUrl(city);
                }

                if (city.ImageUrl == null) continue;

                foreach (var pointOfInterest in city.PointsOfInterest)
                {
                    foreach (var category in pointOfInterest.Categories)
                    {
                        if (userProfile.Preferences.Contains(category.CategoryType)) //pointOfInterest Is In User Preferences
                        {
                            numberOfEqualCategories++;
                        }
                    }
                }

                if (numberOfEqualCategories == 0) continue;

                double similarity = (double)numberOfEqualCategories / (double)numberOfTotalUserCategories;
                citySimilarityDictionary.Add(city.CityId, similarity);
            }

            var sortedCitySimilarityDictionary = from pair in citySimilarityDictionary
                                                 orderby pair.Value descending
                                                 select pair;

            return sortedCitySimilarityDictionary.Take(200).ToDictionary(kvp => kvp.Key, kvp => kvp.Value);
        }
    }
}
