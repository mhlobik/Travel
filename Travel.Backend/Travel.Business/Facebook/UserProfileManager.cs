using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Travel.Business.Watson;
using Travel.Database.Model;
using Travel.Database.Utilities;

namespace Travel.Business.Facebook
{
    public class UserProfileManager
    {
        public async Task<bool> ParseAndStoreUserProfile(UserProfile userProfile)
        {
            var textAnalysisManager = new FacebookTextAnalysis(); // opcenito analiza treba provjeriti kategorija i breakat ak nije ono sto me zanima?
            var userDatabaseManager = new ManageUserFacebookData();
            var cityDatabaseManager = new ManageCityData();

            var updatedUserProfile = userProfile;

            var existingUserProfile = userDatabaseManager.GetUserProfile(userProfile.UserId);

            #region Parse Facebook Events
            if (existingUserProfile != null)
            {
                var fbEvents = existingUserProfile.FacebookEvents;
                foreach (var oldEvent in fbEvents)
                {
                    if (!updatedUserProfile.FacebookEvents.Any(x => x.EventId.Equals(oldEvent.EventId)))
                    {
                        updatedUserProfile.FacebookEvents.Add(oldEvent);
                    }
                }
            }

            var fbEventsAnalysis = await textAnalysisManager.FacebookEventsTextAnalysis(updatedUserProfile.FacebookEvents);
            updatedUserProfile.FacebookEvents = fbEventsAnalysis;
            #endregion

            #region Parse Facebook Groups
            //if (existingUserProfile != null)
            //{
            //    var fbGroups = existingUserProfile.FacebookGroups;
            //    foreach (var oldGroup in fbGroups)
            //    {
            //        if (!updatedUserProfile.FacebookGroups.Any(x => x.GroupId.Equals(oldGroup.GroupId)))
            //        {
            //            updatedUserProfile.FacebookGroups.Add(oldGroup);
            //        }
            //    }
            //}

            //var fbGroupsAnalysis = await textAnalysisManager.FacebookGroupsTextAnalysis(updatedUserProfile.FacebookGroups);
            //updatedUserProfile.FacebookGroups = fbGroupsAnalysis;
            #endregion

            #region Parse Facebook Likes
            //if (existingUserProfile != null)
            //{
            //    var fbLikes = existingUserProfile.FacebookLikes;
            //    foreach (var oldLike in fbLikes)
            //    {
            //        if (!updatedUserProfile.FacebookLikes.Any(x => x.LikedPageId.Equals(oldLike.LikedPageId)))
            //        {
            //            updatedUserProfile.FacebookLikes.Add(oldLike);
            //        }
            //    }
            //}

            //var fbLikesAnalysis = await textAnalysisManager.FacebookLikesTextAnalysis(updatedUserProfile.FacebookLikes);
            //updatedUserProfile.FacebookLikes = fbLikesAnalysis;
            #endregion

            #region Parse Facebook Tagged Places
            var updatedVisitedCityIds = new List<string>();

            var allCities = cityDatabaseManager.GetAllCities();
            var cityNames = allCities.Select(x=>x.Name).ToList();
            var userTaggedPlacesCityNames = updatedUserProfile.FacebookTaggedPlaces.Select(x=>x.City).Distinct().ToList();

            foreach (var city in userTaggedPlacesCityNames)
            {
                var existingCity = allCities.FirstOrDefault(x=>x.Name.Equals(city));
                if(existingCity != null)
                {
                    updatedVisitedCityIds.Add(existingCity.CityId);
                }
            }

            updatedUserProfile.VisitedCityIds = updatedVisitedCityIds;
            #endregion

            var isStored = userDatabaseManager.StoreUserProfile(updatedUserProfile);
            return isStored;

        }
    }
}
