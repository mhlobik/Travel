using System.Collections.Generic;
using Travel.Database.Model;

namespace Travel.Database.Utilities
{
    public class RatedCityDTO
    {
        public List<PointsOfInterest> PointsOfInterests { get; set; }
        public CityRating CityRating { get; set; }
        public string Name { get; set; }
    }
}