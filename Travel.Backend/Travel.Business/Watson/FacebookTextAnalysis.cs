using IBM.WatsonDeveloperCloud.NaturalLanguageUnderstanding.v1;
using IBM.WatsonDeveloperCloud.NaturalLanguageUnderstanding.v1.Model;
using System.Collections.Generic;
using Travel.Database.Model;

namespace Travel.Business.Watson
{
    public class FacebookTextAnalysis
    {
        public List<FacebookEvent> FacebookEventsTextAnalysis(List<FacebookEvent> facebookEvents)
        {
            var updatedFacebookEvents = new List<FacebookEvent>();
            var textAnalysisManager = new WatsonTextAnalysis();
            foreach(var fbEvent in facebookEvents)
            {
                var eventNameTextAnalysis = textAnalysisManager.GetTextAnalysis(fbEvent.EventName);
                var eventDescriptionTextAnalysis = textAnalysisManager.GetTextAnalysis(fbEvent.EventDescription);

                var updatedFbEvent = new FacebookEvent()
                {
                    EventDescription = fbEvent.EventDescription,
                    EventDescriptionAnalysis = eventDescriptionTextAnalysis,
                    EventId = fbEvent.EventId,
                    EventName = fbEvent.EventName,
                    EventNameAnalysis = eventNameTextAnalysis,
                    EventPlaceCity = fbEvent.EventPlaceCity,
                    EventPlaceCountry = fbEvent.EventPlaceCountry,
                    EventRSVPStatus = fbEvent.EventRSVPStatus
                };

                updatedFacebookEvents.Add(updatedFbEvent);
            }

            return updatedFacebookEvents;
        }

        public List<FacebookGroup> FacebookGroupsTextAnalysis(List<FacebookGroup> facebookGroups)
        {
            var updatedFacebookGroups = new List<FacebookGroup>();
            var textAnalysisManager = new WatsonTextAnalysis();
            foreach (var fbGroup in facebookGroups)
            {
                var groupNameTextAnalysis = fbGroup.GroupName != null ? textAnalysisManager.GetTextAnalysis(fbGroup.GroupName) : null;
                var groupDescriptionTextAnalysis = fbGroup.GroupDescription != null ? textAnalysisManager.GetTextAnalysis(fbGroup.GroupDescription) : null;

                var updatedFbGroup = new FacebookGroup()
                {
                    GroupDescription = fbGroup.GroupDescription,
                    GroupDescriptionAnalysis = groupDescriptionTextAnalysis,
                    GroupId = fbGroup.GroupId,
                    GroupName = fbGroup.GroupName,
                    GroupNameAnalysis = groupNameTextAnalysis,
                    GroupPurpose = fbGroup.GroupPurpose,
                    GroupVenueCity = fbGroup.GroupVenueCity
                };

                updatedFacebookGroups.Add(updatedFbGroup);
            }

            return updatedFacebookGroups;
        }

        public List<FacebookLike> FacebookLikesTextAnalysis(List<FacebookLike> facebookLikes)
        {
            var updatedFacebookLikes = new List<FacebookLike>();
            var textAnalysisManager = new WatsonTextAnalysis();
            foreach (var fbLike in facebookLikes)
            {
                var fbLikeNameTextAnalysis = fbLike.LikedPageName != null ? textAnalysisManager.GetTextAnalysis(fbLike.LikedPageName) : null;

                var updatedFbEvent = new FacebookLike()
                {
                    LikedPageId = fbLike.LikedPageId,
                    LikedPageName = fbLike.LikedPageName,
                    LikedPageNameAnalysis = fbLike.LikedPageNameAnalysis
                };

                updatedFacebookLikes.Add(updatedFbEvent);
            }

            return updatedFacebookLikes;
        }
    }
}
