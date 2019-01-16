using System.Collections.Generic;
using Travel.Database.Enums;

namespace Travel.Database.Model
{
    public class UserProfile
    {
        public List<FacebookEvent> FacebookEvents { get; set; }
        public List<FacebookGroup> FacebookGroups { get; set; }
        public List<FacebookLike> FacebookLikes { get; set; }
        public List<FacebookTaggedPlace> FacebookTaggedPlaces { get; set; }
        public List<PointsOfInterestCategoriesEnum> Preferences { get; set; }
        public int MaxFlightPrice { get; set; }
        public int MaxTravelPrice { get; set; }
        public string UserId { get; set; }
        public List<string> VisitedCityIds { get; set; }
        public string LocationName { get; set; }
    }

}
