using Newtonsoft.Json;
using Raven.Client.Documents;
using Raven.Client.Documents.Session;
using System;
using System.Collections.Generic;
using System.Linq;
using Travel.Database.Model;

namespace Travel.Database.Utilities
{
    public class ManageCityData
    {
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

                        if(city != null)
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
    }
}

