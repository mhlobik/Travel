using System.Collections.Generic;
using Travel.Database.Enums;

namespace Travel.Database.Model
{
    public class PointsOfInterest
    {
        public string Id { get; set; }
        public List<PointOfInterestCategory> Categories { get; set; }
        public string Description { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
    }
}
