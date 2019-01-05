using Travel.Database.Model;

namespace Travel.Business.Utilities
{
    public class PointOfInterestsDTO
    {
        public City City { get; set; }
        public string PointOfInterestName { get; set; }
        public string PointOfInterestId { get; set; }
    }
}