using System.Collections.Generic;
using Travel.Database.Model;
using Travel.Database.Utilities;
using System.Linq;
using System;
using Travel.Database.Enums;
using Travel.Business.CityManager;

namespace Travel.Business.Recommenders
{
    public class ContentBased
    {
        public List<Recommendation> GetContentBased(string userId)
        {
            var recommendations = new List<Recommendation>();
            var cityDataManager = new ManageCityData();
            var allCities = cityDataManager.GetAllCities();

            var userDataManager = new ManageUserFacebookData();
            var userProfile = userDataManager.GetUserProfile(userId);

            var recommendationFromEvents = processFacebookEventAnalysis(userProfile, allCities);
            var recommendationFromVisitedCities = processVisitedCities(userProfile, allCities);

            var allRecommendations = recommendationFromEvents.Concat(recommendationFromVisitedCities);

            var sortedRecommendationBySimilarity = allRecommendations.OrderByDescending(x => x.Similarity).Take(400).ToList();

            foreach(var recommendation in sortedRecommendationBySimilarity)
            {

                var wikipediaManager = new WikipediaManager();
                var cityManager = new ManageCityData();

                if (recommendation.RecommendedCity.ImageUrl == null)
                {
                    recommendation.RecommendedCity.ImageUrl = wikipediaManager.GetCityImage(recommendation.RecommendedCity.Name);
                    cityManager.UpdateCityImageUrl(recommendation.RecommendedCity);
                }

                if (recommendation.RecommendedCity.Description == null)
                {
                    recommendation.RecommendedCity.Description = wikipediaManager.GetCityDescription(recommendation.RecommendedCity.Name);
                    cityManager.UpdateCityDescription(recommendation.RecommendedCity);
                }
            }

            Console.WriteLine("ContentBased finish");
            return sortedRecommendationBySimilarity;
        }

        #region Proces Facebook Event Analysis
        private List<Recommendation> processFacebookEventAnalysis(UserProfile userProfile, List<City> allCities)
        {
            var recommendations = new List<Recommendation>();

            foreach (var fbEvent in userProfile.FacebookEvents)
            {
                if (fbEvent.EventDescriptionAnalysis == null) continue;

                var eventCategories = fbEvent.EventDescriptionAnalysis.Categories;
                var eventEntities = fbEvent.EventDescriptionAnalysis.Entities;
                var eventKeywords = fbEvent.EventDescriptionAnalysis.KeyWords;

                foreach (var city in allCities)
                {
                    int numOfEqualCategories = 0, numOfEqualEntities = 0, numOfEqualKeywords = 0;
                    double similarity = 0, similarityCategories = 0, similarityEntities = 0, similarityKeywords = 0;

                    if (city.DescriptionAnalysis == null) continue;

                    if (eventCategories != null)
                    {
                        numOfEqualCategories = parseCategories(eventCategories, city.DescriptionAnalysis.Categories);
                        similarityCategories = (double)numOfEqualCategories / eventCategories.Count;
                    }

                    if (eventEntities != null)
                    {
                        numOfEqualEntities = parseEntities(eventEntities, city, ref recommendations, userProfile.UserId);
                        similarityEntities = (double)numOfEqualEntities / eventEntities.Count;
                    }

                    if (eventKeywords != null)
                    {
                        numOfEqualKeywords = parseKeyWords(eventKeywords, city, ref recommendations, userProfile.UserId);
                        similarityKeywords = (double)numOfEqualKeywords / eventKeywords.Count;
                    }

                    similarity = similarityCategories + similarityEntities + similarityKeywords;

                    if (similarity != 0)
                    {
                        if (!recommendations.Any(x => x.RecommendedCity.CityId.Equals(city.CityId)))
                        {
                            var wikipediaManager = new WikipediaManager();
                            var cityManager = new ManageCityData();

                            if (city.ImageUrl == null)
                            {
                                city.ImageUrl = wikipediaManager.GetCityImage(city.Name);
                                cityManager.UpdateCityImageUrl(city);
                            }

                            if (city.Description == null)
                            {
                                city.Description = wikipediaManager.GetCityDescription(city.Name);
                                cityManager.UpdateCityDescription(city);
                            }

                            recommendations.Add(new Recommendation()
                            {
                                RecommendedCity = city,
                                RecommenderModel = Database.Enums.RecommenderModelEnum.ContentBased,
                                UserId = userProfile.UserId,
                                Similarity = similarity
                            });
                        }
                    }
                }
            }

            var sortedSimilarity = recommendations.OrderByDescending(x => x.Similarity).ToList();
            return sortedSimilarity.Take(200).ToList();
        }
        #endregion

        #region Parse Categories
        private int parseCategories(List<string> eventCategories, List<string> cityCategories)
        {
            var numOfEqualCategories = 0;
            foreach (var eventCategory in eventCategories)
            {
                if (cityCategories.Contains(eventCategory))
                {
                    numOfEqualCategories++;
                }
            }

            return numOfEqualCategories;
        }
        #endregion

        #region Parse Entities
        private int parseEntities(List<TextAnalysisEntity> eventEntities, City city, ref List<Recommendation> recommendations, string userId)
        {
            var numOfEqualEntities = 0;
            foreach (var eventEntity in eventEntities)
            {
                foreach (var cityEntity in city.DescriptionAnalysis.Entities)
                {
                    if (eventEntity.Text.Contains(cityEntity.Text))
                    {
                        numOfEqualEntities++;
                    }

                    if (eventEntity.Text.Equals(city.Name) || eventEntity.Text.Equals(city.Country))
                    {
                        if (!recommendations.Any(x => x.RecommendedCity.CityId.Equals(city.CityId)))
                        {
                            recommendations.Add(new Recommendation()
                            {
                                RecommendedCity = city,
                                RecommenderModel = Database.Enums.RecommenderModelEnum.ContentBased,
                                UserId = userId,
                                Similarity = 1
                            });
                        }
                    }
                }
            }

            return numOfEqualEntities;
        }
        #endregion

        #region Parse KeyWords
        private int parseKeyWords(List<TextAnalysisKeyword> eventKeywords, City city, ref List<Recommendation> recommendations, string userId)
        {
            var numOfEqualKeywords = 0;
            foreach (var eventKeyword in eventKeywords)
            {
                foreach (var cityKeyword in city.DescriptionAnalysis.KeyWords)
                {
                    if (eventKeyword.Text.Contains(cityKeyword.Text))
                    {
                        numOfEqualKeywords++;
                    }

                    if (eventKeyword.Text.Equals(city.Name) || eventKeyword.Text.Equals(city.Country))
                    {
                        if (!recommendations.Any(x => x.RecommendedCity.CityId.Equals(city.CityId)))
                        {
                            recommendations.Add(new Recommendation()
                            {
                                RecommendedCity = city,
                                RecommenderModel = Database.Enums.RecommenderModelEnum.ContentBased,
                                UserId = userId,
                                Similarity = 1
                            });
                        }
                    }
                }
            }

            return numOfEqualKeywords;
        }
        #endregion

        #region Process Visited Cities
        private List<Recommendation> processVisitedCities(UserProfile userProfile, List<City> allCities)
        {
            var recommendations = new List<Recommendation>();
            var visitedCitiesCategories = getVisitedCitiesCategories(userProfile.VisitedCityIds, allCities);
            var cityCategories = getCitiesCategories(allCities);

            foreach (var cityId in cityCategories.Keys)
            {
                var numberOfEqualCategories = 0;

                foreach(var cityCategory in cityCategories[cityId])
                {
                    if (visitedCitiesCategories.Contains(cityCategory))
                    {
                        numberOfEqualCategories++;
                    }
                }

                if (numberOfEqualCategories == 0) continue;

                double similarity = (double)numberOfEqualCategories / (double)visitedCitiesCategories.Count;

                recommendations.Add(new Recommendation()
                {
                    RecommendedCity = allCities.FirstOrDefault(x=>x.CityId.Equals(cityId)),
                    RecommenderModel = RecommenderModelEnum.ContentBased,
                    UserId = userProfile.UserId,
                    Similarity = similarity
                });
            }

            var sortedRecommendationBySimilarity = recommendations.OrderByDescending(x => x.Similarity).ToList();
            return sortedRecommendationBySimilarity.Take(500).ToList();
        }


        private List<PointsOfInterestCategoriesEnum> getVisitedCitiesCategories(List<string> visitedCityIds, List<City> allCities)
        {
            var visitedCities = new List<PointsOfInterestCategoriesEnum>();
            foreach (var visitedCityId in visitedCityIds)
            {
                var city = allCities.FirstOrDefault(x => x.CityId.Equals(visitedCityId));
                foreach (var pointOfInterest in city.PointsOfInterest)
                {
                    visitedCities.AddRange(pointOfInterest.Categories.Select(x => x.CategoryType).ToList());
                }

            }

            return visitedCities.Distinct().ToList();
        }

        private Dictionary<string, List<PointsOfInterestCategoriesEnum>> getCitiesCategories(List<City> allCities)
        {
            var cityCategoriesDictionary = new Dictionary<string, List<PointsOfInterestCategoriesEnum>>();
            foreach (var city in allCities)
            {
                var categories = new List<PointsOfInterestCategoriesEnum>();
                foreach (var pointOfInterest in city.PointsOfInterest)
                {
                    categories.AddRange(pointOfInterest.Categories.Select(x => x.CategoryType).ToList());
                }
                cityCategoriesDictionary.Add(city.CityId, categories.Distinct().ToList());
            }

            return cityCategoriesDictionary;
        }
        #endregion
    }
}
