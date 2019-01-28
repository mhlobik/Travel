using Newtonsoft.Json;
using Raven.Client.Documents;
using Raven.Client.Documents.Linq;
using Raven.Client.Documents.Session;
using System;
using System.Collections.Generic;
using System.Linq;
using Travel.Database.Model;

namespace Travel.Database.Utilities
{
    public class ManageCityData
    {
        public void UpdateCityHotels(City city)
        {
            IDocumentStore store;
            using (store = DatabaseConnection.DocumentStoreInitialization())
            {
                using (IDocumentSession session = store.OpenSession())
                {
                    var existingCity = session.Query<City>().FirstOrDefault(x => x.CityId == city.CityId);
                    if (existingCity != null)
                    {
                        var existingHotels = existingCity.Hotels;
                        var newHotels = city.Hotels;
                        // ako su eventi razliciti, treba nove dodati u bazu (stare zadržati)
                        var arePIEqual = (existingHotels != null) && (newHotels != null) ? existingHotels.SequenceEqual(newHotels) : false;
                        if (!arePIEqual)
                        {
                            session.Advanced.Patch(existingCity, x => x.Hotels, city.Hotels);
                        }

                        session.SaveChanges();
                        System.Console.WriteLine($"\t\t{city.Name} update-ani hoteli");
                    }
                }
            }
        }

        public void StoreCity(City city)
        {
            IDocumentStore store;
            using (store = DatabaseConnection.DocumentStoreInitialization())
            {
                using (IDocumentSession session = store.OpenSession())
                {
                    var existingCity = session.Query<City>().Any(x => x.CityId == city.CityId);
                    if (!existingCity)
                    {
                        session.Store(city);
                        session.SaveChanges();
                    }
                }
            }
        }

        public void DeleteCity(City city)
        {
            IDocumentStore store;
            using (store = DatabaseConnection.DocumentStoreInitialization())
            {
                using (IDocumentSession session = store.OpenSession())
                {
                    var existingCity = session.Query<City>().FirstOrDefault(x => x.CityId == city.CityId);
                    session.Delete(existingCity);
                    session.SaveChanges();
                }
            }
        }

        public List<City> GetCitiesForChooser()
        {
            IDocumentStore store;
            var cities = new List<City>();
            var idList = new List<string>();

            var rand = new Random();
            for (int i = 0; i < 20; i++)
            {
                idList.Add(rand.Next(100, 3527).ToString());
            }

            using (store = DatabaseConnection.DocumentStoreInitialization())
            {
                using (IDocumentSession session = store.OpenSession())
                {
                    foreach (var id in idList)
                    {
                        var city = session.Query<City>().FirstOrDefault(x => x.CityId == id);

                        if (city != null)
                        {
                            cities.Add(city);
                        }
                    }
                }
            }

            return cities;
        }

        public bool StoreCityChooserRatings(List<CityRating> cityRatings)
        {
            var isStored = false;

            IDocumentStore store;
            using (store = DatabaseConnection.DocumentStoreInitialization())
            {
                using (IDocumentSession session = store.OpenSession())
                {
                    foreach (var cityRating in cityRatings)
                    {
                        session.Store(cityRating);
                        session.SaveChanges();
                    }
                    isStored = true;
                }
            }

            return isStored;
        }

        public List<City> GetCities(int n, int m)
        {
            IDocumentStore store;
            var cities = new List<City>();
            var idList = new List<string>();

            var rand = new Random();
            for (int i = n; i < m; i++)
            {
                idList.Add(i.ToString());
            }

            using (store = DatabaseConnection.DocumentStoreInitialization())
            {
                using (IDocumentSession session = store.OpenSession())
                {
                    foreach (var id in idList)
                    {
                        var city = session.Query<City>().FirstOrDefault(x => x.CityId == id);
                        cities.Add(city);
                    }
                }
            }

            return cities;
        }

        public void UpdateCityPointsOfInterest(City city)
        {
            IDocumentStore store;
            using (store = DatabaseConnection.DocumentStoreInitialization())
            {
                using (IDocumentSession session = store.OpenSession())
                {
                    var existingCity = session.Query<City>().FirstOrDefault(x => x.CityId == city.CityId);
                    if (existingCity != null)
                    {
                        var existingPI = existingCity.PointsOfInterest;
                        var newPI = city.PointsOfInterest;
                        // ako su eventi razliciti, treba nove dodati u bazu (stare zadržati)
                        var arePIEqual = (existingPI != null) && (newPI != null) ? existingPI.SequenceEqual(newPI) : false;
                        if (!arePIEqual)
                        {
                            session.Advanced.Patch(existingCity, x => x.PointsOfInterest, city.PointsOfInterest);
                        }

                        session.SaveChanges();
                    }
                }
            }
        }

        public List<City> GetAllCities()
        {
            IDocumentStore store;
            var cities = new List<City>();

            using (store = DatabaseConnection.DocumentStoreInitialization())
            {
                using (IDocumentSession session = store.OpenSession())
                {
                    cities = session.Query<City>().ToList();
                }
            }

            return cities;
        }

        public List<CityRating> GetAllCityRatings()
        {
            IDocumentStore store;
            var cityRatings = new List<CityRating>();

            using (store = DatabaseConnection.DocumentStoreInitialization())
            {
                using (IDocumentSession session = store.OpenSession())
                {
                    cityRatings = session.Query<CityRating>().ToList();
                }
            }

            return cityRatings;
        }

        public void UpdateCityDescription(City city)
        {
            IDocumentStore store;
            using (store = DatabaseConnection.DocumentStoreInitialization())
            {
                using (IDocumentSession session = store.OpenSession())
                {
                    var existingCity = session.Query<City>().FirstOrDefault(x => x.CityId == city.CityId);
                    if (existingCity != null)
                    {
                        session.Advanced.Patch(existingCity, x => x.Description, city.Description);
                        session.SaveChanges();
                    }
                }
            }
        }

        public void UpdateCityImageUrl(City city)
        {
            IDocumentStore store;
            using (store = DatabaseConnection.DocumentStoreInitialization())
            {
                using (IDocumentSession session = store.OpenSession())
                {
                    var existingCity = session.Query<City>().FirstOrDefault(x => x.CityId == city.CityId);
                    if (existingCity != null)
                    {
                        session.Advanced.Patch(existingCity, x => x.ImageUrl, city.ImageUrl);
                        session.SaveChanges();
                    }
                }
            }
        }

        public Airport GetCityAirport(string cityName)
        {
            IDocumentStore store;
            var airport = new Airport();

            using (store = DatabaseConnection.DocumentStoreInitialization())
            {
                using (IDocumentSession session = store.OpenSession())
                {
                    airport = session.Query<Airport>().FirstOrDefault(x => x.City.Equals(cityName) || x.IATA.Equals(cityName));
                }
            }

            return airport;
        }

        public CityRating GetCityRating(string cityId, string userId)
        {
            IDocumentStore store;
            var cityRating = new CityRating();

            using (store = DatabaseConnection.DocumentStoreInitialization())
            {
                using (IDocumentSession session = store.OpenSession())
                {
                    cityRating = session.Query<CityRating>().FirstOrDefault(x => x.CityId.Equals(cityId) && x.UserId.Equals(userId));
                }
            }

            return cityRating;
        }

        public void SaveCityRating(CityRating cityRating)
        {
            IDocumentStore store;
            using (store = DatabaseConnection.DocumentStoreInitialization())
            {
                using (IDocumentSession session = store.OpenSession())
                {
                    var existingCity = session.Query<CityRating>().Any(x => x.CityId == cityRating.CityId && x.UserId == cityRating.UserId);
                    if (!existingCity)
                    {
                        session.Store(cityRating);
                        session.SaveChanges();
                    }
                }
            }
        }

        public void SaveRecommendation(Recommendation recommendation)
        {
            IDocumentStore store;
            using (store = DatabaseConnection.DocumentStoreInitialization())
            {
                using (IDocumentSession session = store.OpenSession())
                {
                    var existingRecommendation = session.Query<Recommendation>().FirstOrDefault(x => x.RecommendedCity.Equals(recommendation.RecommendedCity)
                    && x.RecommenderModel == recommendation.RecommenderModel && x.UserId == recommendation.UserId);

                    if (existingRecommendation != null)
                    {
                        session.Advanced.Patch(existingRecommendation, x => x.Rating, recommendation.Rating);
                        session.SaveChanges();
                    }
                    else
                    {
                        session.Store(recommendation);
                        session.SaveChanges();
                    }
                }
            }
        }

        public Recommendation GetRecommendation(Recommendation recommendation)
        {
            IDocumentStore store;
            var recommendationDatabase = new Recommendation();

            using (store = DatabaseConnection.DocumentStoreInitialization())
            {
                using (IDocumentSession session = store.OpenSession())
                {
                    recommendationDatabase = session.Query<Recommendation>().FirstOrDefault(x => x.RecommendedCity.Equals(recommendation.RecommendedCity)
                    && x.RecommenderModel == recommendation.RecommenderModel && x.UserId == recommendation.UserId);
                }
            }

            return recommendationDatabase;
        }


        public List<Airport> GetAllAirports()
        {
            IDocumentStore store;
            var cities = new List<string>();
            var airports = new List<Airport>();
            var filteredAirports = new List<Airport>();

            using (store = DatabaseConnection.DocumentStoreInitialization())
            {
                using (IDocumentSession session = store.OpenSession())
                {
                    cities = session.Query<City>().Select(x => x.Name).ToList();
                    airports = session.Query<Airport>().ToList();
                }
            }

            return airports;
        }

        public List<CityRating> GetUserCityRatings(string userId)
        {
            IDocumentStore store;
            var cityRatings = new List<CityRating>();

            using (store = DatabaseConnection.DocumentStoreInitialization())
            {
                using (IDocumentSession session = store.OpenSession())
                {
                    cityRatings = session.Query<CityRating>().Where(x => x.UserId.Equals(userId)).ToList();
                }
            }

            return cityRatings;
        }

        public Dictionary<string, RatedCityDTO> GetAllRatedCities(string userId)
        {
            var userRatings = GetUserCityRatings(userId);
            var ratedCityIds = userRatings.Select(x => x.CityId).Distinct().ToList();
            var ratedCities = new List<City>();

            IDocumentStore store;
            using (store = DatabaseConnection.DocumentStoreInitialization())
            {
                using (IDocumentSession session = store.OpenSession())
                {
                    ratedCities = session.Query<City>().Where(x => x.CityId.In(ratedCityIds)).ToList();
                }
            }

            var ratedCityDictionary = new Dictionary<string, RatedCityDTO>();

            #region Popuni dictionary

            foreach (var city in ratedCities)
            {
                var key = city.CityId;

                if (ratedCityDictionary.Keys.Contains(key))
                {
                    ratedCityDictionary[key] = new RatedCityDTO()
                    {
                        CityRating = userRatings.FirstOrDefault(x => x.CityId.Equals(key)),
                        PointsOfInterests = city.PointsOfInterest,
                        Name = city.Name
                    };
                }
                else
                {
                    ratedCityDictionary.Add(key, new RatedCityDTO()
                    {
                        CityRating = userRatings.FirstOrDefault(x => x.CityId.Equals(key)),
                        PointsOfInterests = city.PointsOfInterest,
                        Name = city.Name
                    });
                }
            }

            #endregion

            return ratedCityDictionary;
        }

        public bool UpdateDescriptionAnalysis(City city)
        {
            IDocumentStore store;
            using (store = DatabaseConnection.DocumentStoreInitialization())
            {
                using (IDocumentSession session = store.OpenSession())
                {
                    var existingCity = session.Query<City>().FirstOrDefault(x => x.CityId.Equals(city.CityId));
                    session.Advanced.Patch(existingCity, x => x.DescriptionAnalysis, city.DescriptionAnalysis);

                    try
                    {
                        session.SaveChanges();
                        System.Console.WriteLine($"\t\t{city.Name} update-ana analiza descriptiona\n");
                        return true;
                    }
                    catch (Exception ex)
                    {
                        return false;
                    }
                }
            }
        }
    }
}

