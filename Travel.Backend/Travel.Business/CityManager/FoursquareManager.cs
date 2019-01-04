using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Travel.Database.Enums;
using Travel.Database.Model;

namespace Travel.Business.CityManager
{
    public class FoursquareManager
    {

        public List<PointsOfInterest> GetVenuesForCity(string cityName)
        {
            var urlWithCity = baseUrl + cityName;
            var completeUrl = urlWithCity + "&client_id=" + clientId + "&client_secret=" + clientSecret + "&v=20181218";
            var venues = new List<PointsOfInterest>();

            using (var client = new System.Net.Http.HttpClient())
            {
                var resp = Task.Run(async () => await client.GetAsync(String.Format(completeUrl))).ConfigureAwait(false).GetAwaiter().GetResult();
                if (resp.IsSuccessStatusCode)
                {
                    var resu = JObject.Parse(Task.Run(async () => await resp.Content.ReadAsStringAsync()).ConfigureAwait(false).GetAwaiter().GetResult());
                    var resultResponse = resu["response"];
                    venues = resultResponse["venues"].ToObject<List<PointsOfInterest>>();
                }
            }

            venues.ForEach(x => x.Categories = ParseVenueCategories(x.Categories));
            var filteredVenues = new List<PointsOfInterest>();
            foreach(var venue in venues)
            {
                venue.Categories = ParseVenueCategories(venue.Categories);
                if (!venue.Categories.Any()) continue;
                filteredVenues.Add(venue);
            }

            
            return filteredVenues;
        }

        public List<PointOfInterestCategory> ParseVenueCategories(List<PointOfInterestCategory> categories)
        {
            var parsedCategories = new List<PointOfInterestCategory>();

            foreach (var category in categories)
            {
                var categoryType = GetPointOfInterestEnum(category.Name);
                if (categoryType == 0) continue;
                category.CategoryType = categoryType;

                parsedCategories.Add(category);
            }

            return parsedCategories;
        }

        public PointsOfInterestCategoriesEnum GetPointOfInterestEnum(string name)
        {
            switch (name)
            {
                case "Arts & Entertainment":
                    return PointsOfInterestCategoriesEnum.Arts;
                case "Beach":
                    return PointsOfInterestCategoriesEnum.Beach;
                case "Entertainment":
                    return PointsOfInterestCategoriesEnum.Entertainment;
                case "FamilyTravel":
                    return PointsOfInterestCategoriesEnum.FamilyTravel;
                case "Restaurant":
                    return PointsOfInterestCategoriesEnum.Gastro;
                case "HistoricalContent":
                    return PointsOfInterestCategoriesEnum.HistoricalContent;
                case "Mountain":
                    return PointsOfInterestCategoriesEnum.Mountain;
                case "Outdoors":
                    return PointsOfInterestCategoriesEnum.Outdoors;
                case "Recreation":
                    return PointsOfInterestCategoriesEnum.Recreation;
                case "Skiing":
                    return PointsOfInterestCategoriesEnum.Skiing;

                case "Spiritual Center":
                    return PointsOfInterestCategoriesEnum.SpiritualCenter;
                    case "Buddhist Temple":
                        return PointsOfInterestCategoriesEnum.SpiritualCenter;
                    case "Cemevi":
                        return PointsOfInterestCategoriesEnum.SpiritualCenter;
                    case "Church":
                        return PointsOfInterestCategoriesEnum.SpiritualCenter;
                    case "Confucian Temple":
                        return PointsOfInterestCategoriesEnum.SpiritualCenter;
                    case "Hindu Temple":
                        return PointsOfInterestCategoriesEnum.SpiritualCenter;
                    case "Kingdom Hall":
                        return PointsOfInterestCategoriesEnum.SpiritualCenter;
                    case "Monastery":
                        return PointsOfInterestCategoriesEnum.SpiritualCenter;
                    case "Mosque":
                        return PointsOfInterestCategoriesEnum.SpiritualCenter;
                    case "Prayer Room":
                        return PointsOfInterestCategoriesEnum.SpiritualCenter;
                    case "Shrine":
                        return PointsOfInterestCategoriesEnum.SpiritualCenter;
                    case "Sikh Temple":
                        return PointsOfInterestCategoriesEnum.SpiritualCenter;
                    case "Synagogue":
                        return PointsOfInterestCategoriesEnum.SpiritualCenter;
                    case "Temple":
                        return PointsOfInterestCategoriesEnum.SpiritualCenter;
                    case "Terreiro":
                        return PointsOfInterestCategoriesEnum.SpiritualCenter;


                case "Memorial Site":
                    return PointsOfInterestCategoriesEnum.MemorialSite;
                case "Museum":
                    return PointsOfInterestCategoriesEnum.Museum;
                    case "Art Museum":
                        return PointsOfInterestCategoriesEnum.Museum;
                    case "History Museum":
                        return PointsOfInterestCategoriesEnum.Museum;
                    case "Planetarium":
                        return PointsOfInterestCategoriesEnum.Museum;
                    case "Science Museum":
                        return PointsOfInterestCategoriesEnum.Museum;

                case "Historic Site":
                    return PointsOfInterestCategoriesEnum.HistoricalSite;
                case "Castle":
                    return PointsOfInterestCategoriesEnum.Castle;
                case "Palace":
                    return PointsOfInterestCategoriesEnum.Palace;
                case "Ski Area":
                    return PointsOfInterestCategoriesEnum.SkiArea;

                case "Rock Climbing Spot":
                    return PointsOfInterestCategoriesEnum.RockClimbingSpot;

                case "Circus":
                    return PointsOfInterestCategoriesEnum.Circus;
                case "Aquarium":
                    return PointsOfInterestCategoriesEnum.Aquarium;
                case "Water Park":
                    return PointsOfInterestCategoriesEnum.WaterPark;
                case "Zoo":
                    return PointsOfInterestCategoriesEnum.Zoo;
                case "Playground":
                    return PointsOfInterestCategoriesEnum.Playground;
                case "Pool":
                    return PointsOfInterestCategoriesEnum.Pool;
                case "Dive Spot":
                    return PointsOfInterestCategoriesEnum.DiveSpot;
                case "Theme Park":
                    return PointsOfInterestCategoriesEnum.ThemePark;
                    case "Theme Park Ride / Attraction":
                        return PointsOfInterestCategoriesEnum.ThemePark;

                case "Paintball Field":
                    return PointsOfInterestCategoriesEnum.PaintballField;
                case "Bike Trail":
                    return PointsOfInterestCategoriesEnum.BikeTrail;
                case "Rafting":
                    return PointsOfInterestCategoriesEnum.Rafting;
                case "Recreation Center":
                    return PointsOfInterestCategoriesEnum.RecreationCenter;

                case "Campground":
                    return PointsOfInterestCategoriesEnum.Campground;
                case "Cave":
                    return PointsOfInterestCategoriesEnum.Cave;
                case "Hill":
                    return PointsOfInterestCategoriesEnum.Hill;
                case "Hot Spring":
                    return PointsOfInterestCategoriesEnum.HotSpring;
                case "Nature Preserve":
                    return PointsOfInterestCategoriesEnum.NAturePreserve;
                case "Park":
                    return PointsOfInterestCategoriesEnum.Park;
                case "Pedestrian Plaza":
                    return PointsOfInterestCategoriesEnum.PedestrianPlaza;
                case "Other Great Outdoors":
                    return PointsOfInterestCategoriesEnum.OtherGreatOutdoors;
                case "Waterfall":
                    return PointsOfInterestCategoriesEnum.Waterfall;
                case "Volcano":
                    return PointsOfInterestCategoriesEnum.Volcan;
                case "Vineyard":
                    return PointsOfInterestCategoriesEnum.Vineyard;
                case "National Park":
                    return PointsOfInterestCategoriesEnum.NationalPark;

                case "Arcade":
                    return PointsOfInterestCategoriesEnum.Arcade;
                case "Bowling Alley":
                    return PointsOfInterestCategoriesEnum.BowlingAlley;
                case "Casino":
                    return PointsOfInterestCategoriesEnum.Casino;
                case "Comedy Club":
                    return PointsOfInterestCategoriesEnum.ComedyClub;
                case "Concert Hall":
                    return PointsOfInterestCategoriesEnum.ConcertHall;
                case "Disc Golf":
                    return PointsOfInterestCategoriesEnum.DiscGolf;
                case "General Entertainment":
                    return PointsOfInterestCategoriesEnum.GeneralEntertainment;
                case "Go Kart Track":
                    return PointsOfInterestCategoriesEnum.GoKartTrack;
                case "Karaoke Box":
                    return PointsOfInterestCategoriesEnum.KaraokeBox;
                case "Laser Tag":
                    return PointsOfInterestCategoriesEnum.LaserTag;
                case "Mini Golf":
                    return PointsOfInterestCategoriesEnum.MiniGolf;
                case "Movie Theater":
                    return PointsOfInterestCategoriesEnum.MovieTheater;
                    case "Drive -in Theater":
                        return PointsOfInterestCategoriesEnum.MovieTheater;
                    case "Indie Movie Theater":
                        return PointsOfInterestCategoriesEnum.MovieTheater;
                    case "Multiplex":
                        return PointsOfInterestCategoriesEnum.MovieTheater;

                case "Pool Hall":
                    return PointsOfInterestCategoriesEnum.PoolHall;
                case "Golf Course":
                    return PointsOfInterestCategoriesEnum.GolfCourse;
                case "Art Gallery":
                    return PointsOfInterestCategoriesEnum.ArtGallery;
                case "Exhibit":
                    return PointsOfInterestCategoriesEnum.Exhibit;
                case "Performing Arts Venue":
                    return PointsOfInterestCategoriesEnum.PerformingArtsVenue;
                case "Public Art":
                    return PointsOfInterestCategoriesEnum.PublicArt;
                case "Outdoor Sculpture":
                    return PointsOfInterestCategoriesEnum.PublicArt;
                case "Street Art":
                    return PointsOfInterestCategoriesEnum.PublicArt;

                case "Apres Ski Bar":
                    return PointsOfInterestCategoriesEnum.ApresSkiBar;
                case "SkiChairlift":
                    return PointsOfInterestCategoriesEnum.SkiChairlift;
                case "SkiChalet":
                    return PointsOfInterestCategoriesEnum.SkiChalet;
                case "SkiLodge":
                        return PointsOfInterestCategoriesEnum.SkiLodge;
                case "SkiTrail":
                    return PointsOfInterestCategoriesEnum.SkiTrail;

            }

            if(name.Contains("Restaurant") || name.Contains("Vineyard"))
            {
                return PointsOfInterestCategoriesEnum.Gastro;
            }

            return 0;
        }

    }
}
