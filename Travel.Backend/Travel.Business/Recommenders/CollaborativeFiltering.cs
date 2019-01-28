using Travel.Database.Utilities;
using System.Linq;
using System.Collections.Generic;
using Travel.Database.Model;
using Travel.Database.Enums;
using System;
using Travel.Business.Utilities;
using System.IO;
using Travel.Business.CityManager;

namespace Travel.Business.Recommenders
{
    public class CollaborativeFiltering
    {
        public List<Recommendation> GetCollaborativeFiltering(string userId)
        {
            var similarCities = findSimilarCities(userId);

            var cityDictionary = MappingDataManager.MapCityRatingToCityIdDictionary(similarCities);
            var userDictionary = MappingDataManager.MapCityRatingToUserIdDictionary(similarCities);
            var userIndex = userDictionary.Keys.ToList().IndexOf(userId);

            var numOfItems = cityDictionary.Keys.Count;
            var numOfUsers = userDictionary.Keys.Count;

            var userItemMatrix = mapSimilarCitiesToMatrix(userDictionary, cityDictionary, numOfItems, numOfUsers);
            //var userItemMatrix = mapTestResult();
            //var recommendedRating = userItemAlgorithm(7, 6, userItemMatrix, itemsRatingAverage, 8, 8);

            var itemsRatingAverage = calculateAverage(numOfItems, numOfUsers, userItemMatrix);

            var recommendedCityRatings = new List<CityRating>();

            //za gradove koje korisnik nije ocjenio, procijeni ocjene
            foreach (var cityId in cityDictionary.Keys)
            {
                var cityIndex = cityDictionary.Keys.ToList().IndexOf(cityId);
                var userRatedCity = cityDictionary[cityId].ToList().FirstOrDefault(x => x.UserId.Equals(userId)) == null ? false : true;

                if (!userRatedCity)
                {
                    var recommendedRating = getRecommendedRating(cityIndex, userIndex, userItemMatrix, itemsRatingAverage, numOfItems, numOfUsers);

                    // nakon sto izracunamo ocjene, preporuci korisniku one gradove koje bi on ocjenio sa 4 i 5, a da nisu vec u korisnik gradovi
                    if (recommendedRating >= 3)
                    {
                        recommendedCityRatings.Add(new CityRating()
                        {
                            CityId = cityId,
                            Rating = (int)Math.Round(recommendedRating),
                            UserId = userId
                        });
                    }
                }
            }

            var recommendationList = getRecommendationList(recommendedCityRatings, similarCities, userId);

            Console.WriteLine("CollaborativeFiltering finish");

            return recommendationList;
        }

        private List<CityRating> findSimilarCities(string userId)
        {
            var userDataManager = new ManageUserFacebookData();
            var allUsers = userDataManager.GetAllUsers();

            var cityDataManager = new ManageCityData();
            var userCities = cityDataManager.GetAllRatedCities(userId);
            var newUserCities = MappingDataManager.InitializeFilteredCities(userCities);

            foreach (var neigbhor in allUsers)
            {
                if (neigbhor.UserId.Equals(userId)) continue;

                var neigbhorCities = cityDataManager.GetAllRatedCities(neigbhor.UserId);
                var filteredCities = new List<CityRating>();

                foreach (var userCityId in userCities.Keys)
                {
                    var userCityPointsOfInterestsCategories = MappingDataManager.SelectPointOfInterestsCategories(userCities[userCityId].PointsOfInterests);

                    foreach (var neigbhorCityId in neigbhorCities.Keys)
                    {
                        if (userCityId == neigbhorCityId) continue;

                        var neigbhorCityPointsOfInterestsCategories = MappingDataManager.SelectPointOfInterestsCategories(neigbhorCities[neigbhorCityId].PointsOfInterests);
                        var similarity = calculateCitySimilarity(userCityPointsOfInterestsCategories, neigbhorCityPointsOfInterestsCategories);

                        if (similarity >= 0.5)
                        {
                            filteredCities.Add(neigbhorCities[neigbhorCityId].CityRating);
                        }
                    }

                    foreach (var city in filteredCities)
                    {
                        if (!newUserCities.Contains(city))
                        {
                            newUserCities.Add(city);
                        }
                    }
                }
            }

            return newUserCities;
        }

        private double calculateCitySimilarity(List<PointsOfInterestCategoriesEnum> userCityCategories, List<PointsOfInterestCategoriesEnum> neigbhorCityCategories)
        {
            var numberOfTotalUserCityCategories = userCityCategories.Count();
            var numberOfEqualCategories = 0;

            foreach (var category in neigbhorCityCategories)
            {
                if (userCityCategories.Contains(category))
                {
                    numberOfEqualCategories++;
                }
            }

            double similarity = 0;
            if (numberOfTotalUserCityCategories != 0)
            {
                similarity = (double)numberOfEqualCategories / (double)numberOfTotalUserCityCategories;
            }

            return similarity;
        }

        private float[,] mapSimilarCitiesToMatrix(Dictionary<string, List<CityRating>> userDictionary, Dictionary<string, List<CityRating>> cityDictionary, int numOfItems, int numOfUsers)
        {
            var result = new float[numOfItems, numOfUsers];

            int i = 0;
            foreach (var cityId in cityDictionary.Keys)
            {
                int j = 0;
                foreach (var userId in userDictionary.Keys)
                {
                    var rating = userDictionary[userId].FirstOrDefault(x => x.CityId.Equals(cityId) && x.UserId.Equals(userId));
                    result[i, j] = rating != null ? rating.Rating : 0;
                    j++;
                }
                i++;
            }

            return result;
        }

        private float[] calculateAverage(int numOfItems, int numOfUsers, float[,] data)
        {
            float[] result = new float[numOfItems];

            for (int i = 0; i < numOfItems; i++)
            {
                float sumOfItemRatings = 0;
                int ratingsCount = 0;

                for (int j = 0; j < numOfUsers; j++)
                {
                    float ratingInIthRow = data[i, j];

                    if (ratingInIthRow != 0)
                    {
                        sumOfItemRatings += ratingInIthRow;
                        ratingsCount++;
                    }
                }
                result[i] = sumOfItemRatings / ratingsCount;
            }

            return result;
        }


        /// <summary>
        /// a.	Normalizirati ocjene
        /// b.	Računamo cosine mjeru sličnosti između gradova
        /// c.	Odredi skup sličnih gradova (order by sličnost i prva 4 ako nisu negativna i ako postoji ocjena odabranog korisnika)
        /// d.	Izračunati preporuku ocjene
        /// </summary>
        /// <param name="item">Koordinata predmeta/grada</param>
        /// <param name="user">Koordinata korisnika</param>
        /// <param name="userItemMatrix">User-Item matrica s kojom racunamo</param>
        /// <param name="itemsRatingAverage">vektor prosjeka ocjena gradova po retcima</param>
        private float getRecommendedRating(int item, int user, float[,] userItemMatrix, float[] itemsRatingAverage, int numOfItems, int numOfUsers)
        {
            var normalizedMatrix = normalizeRatings(numOfItems, numOfUsers, userItemMatrix, itemsRatingAverage);

            float[,] matrix = userItemMatrix;
            var similarities = calculateCosineSimilarity(item, normalizedMatrix, numOfItems, numOfUsers);
            var sortedSimilarities = similarities.OrderByDescending(x => x.Value).ToList();
            var recommendedRating = calculateRecommendedRating(item, user, userItemMatrix, sortedSimilarities, numOfItems, numOfUsers, 4);

            return recommendedRating;
        }

        private float[,] normalizeRatings(int numOfItems, int numOfUsers, float[,] matrix, float[] average)
        {
            var result = new float[numOfItems, numOfUsers];

            for (int i = 0; i < numOfItems; i++)
            {
                for (int j = 0; j < numOfUsers; j++)
                {
                    float rating = matrix[i, j];
                    if (rating != 0)
                    {
                        result[i, j] = rating - average[i];
                    }
                }
            }

            return result;
        }

        private SimilarityItem[] calculateCosineSimilarity(int item, float[,] matrix, int numOfItems, int numOfUsers)
        {
            var similarities = new SimilarityItem[numOfItems];

            for (int i = 0; i < numOfItems; i++)
            {
                float up = 0;
                float sumOfOwnerRatings = 0;
                float sumOfOtherRatings = 0;
                float result;

                if (i != item)
                {
                    //gore je suma umnozaka elementa od x i y po pozicijama
                    for (int j = 0; j < numOfUsers; j++)
                    {
                        float other = matrix[i, j];
                        float owner = matrix[item, j];
                        up += owner * other;

                        sumOfOwnerRatings += (float)Math.Pow(owner, 2);
                        sumOfOtherRatings += (float)Math.Pow(other, 2);
                    }
                    result = sumOfOtherRatings * sumOfOwnerRatings == 0 ? 0 : (float)(up / Math.Sqrt(sumOfOtherRatings * sumOfOwnerRatings));
                }
                else
                {
                    //item je sam sebi slican
                    result = 1;
                }
                similarities[i] = new SimilarityItem()
                {
                    Position = i,
                    Value = result
                };
            }

            return similarities;
        }

        private float calculateRecommendedRating(int item, int user, float[,] userItemMatrix, List<SimilarityItem> similarities, int numOfItems, int numOfUsers, int k)
        {
            int taken = 0;
            float resultSimilarities = 0;
            float gradeMultipleSimilarities = 0;
            for (int i = similarities.Count - 1; i >= 0; i--)
            {
                //dohvati k elemenata s najvecom vrijednoscu slicnosti
                if (taken == k)
                {
                    break;
                }
                float similarity = similarities[i].Value;

                if (similarity > 0)
                {
                    //pozicija elementa, tako da mogu iz originalne tablice za usera uzet ocjenu tog predmeta
                    int position = similarities[i].Position;
                    int grade = (int)userItemMatrix[position, user];

                    //ako je ocjena veca od nule i ako nisam na promatranom predmetu
                    if (grade > 0 && position != item)
                    {
                        taken++;
                        resultSimilarities += similarity;
                        gradeMultipleSimilarities += grade * similarity;
                    }
                }
            }

            float recommendation = resultSimilarities != 0 ? gradeMultipleSimilarities / resultSimilarities : 0;

            return recommendation;
        }

        private float[,] mapTestResult()
        {
            var lines = System.IO.File.ReadAllLines(@"D:\Diplomski Rad\test.txt");
            int x = 0;
            int numOfItems = 8, numOfUsers = 8;
            var result = new float[numOfItems, numOfUsers];

            var i = 0;
            foreach (var line in lines)
            {
                Console.WriteLine(line);

                var ratings = line.Split(' ');
                for (int j = 0; j < numOfUsers; j++)
                {
                    var rating = ratings[j];
                    if (rating.Equals("X"))
                    {
                        result[i, j] = 0;
                    }
                    else
                    {
                        result[i, j] = float.Parse(rating);
                    }
                }
                i++;
            }

            return result;
        }

        private List<Recommendation> getRecommendationList(List<CityRating> recommendedRatings, List<CityRating> similarCities, string userId)
        {
            var result = new List<Recommendation>();
            var cityDataManager = new ManageCityData();
            var cities = cityDataManager.GetAllCities();

            var tempList = recommendedRatings.Count != 0 ? recommendedRatings : similarCities;

            foreach (var rating in tempList)
            {
                if (rating.Rating < 3) continue;

                var wikipediaManager = new WikipediaManager();
                var cityManager = new ManageCityData();

                var city = cities.FirstOrDefault(x => x.CityId.Equals(rating.CityId));

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

                result.Add(new Recommendation()
                {
                    RecommendedCity = city,
                    RecommenderModel = RecommenderModelEnum.CollaborativeFiltering,
                    UserId = userId
                });
            }

            return result;
        }
    }

    internal class SimilarityItem
    {
        public int Position { get; set; }
        public float Value { get; set; }
    }
}