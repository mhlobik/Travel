using Travel.Database.Enums;

namespace Travel.Database.Model
{
    public class PointOfInterestCategory
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public PointsOfInterestCategoriesEnum CategoryType { get; set; }
    }
}
