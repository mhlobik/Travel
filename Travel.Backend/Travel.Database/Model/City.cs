using System.Collections.Generic;

namespace Travel.Database.Model
{
    public class City
    {
        public string CityId { get; set; }
        public string Country { get; set; }
        public List<Flight> Flights { get; set; }
        public List<Hotel> Hotels { get; set; }
        public string Name { get; set; }
        public List<PointsOfInterest> PointsOfInterest { get; set; }
    }
}
