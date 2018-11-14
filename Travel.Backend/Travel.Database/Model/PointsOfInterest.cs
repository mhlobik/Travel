using System.Collections.Generic;
using Travel.Database.Enums;

namespace Travel.Database.Model
{
    public class PointsOfInterest
    {
        public List<PointsOfInterestCategoriesEnum> Categories { get; set; }
        public string Description { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
    }
}
