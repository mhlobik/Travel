using System.Collections.Generic;

namespace Travel.Database.Model
{
    public class UserProfile
    {
        public List<FacebookEvent> FacebookEvents { get; set; }
        public List<FacebookGroup> FacebookGroups { get; set; }
        public List<FacebookLike> FacebookLikes { get; set; }
        public List<FacebookTaggedPlace> FacebookTaggedPlaces { get; set; }
        public List<Preference> Preferences { get; set; }
        public string UserId { get; set; }
    }

}
