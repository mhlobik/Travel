using Microsoft.VisualStudio.TestTools.UnitTesting;
using Raven.Client.Documents;
using Raven.Client.Documents.Session;
using System.Collections.Generic;
using System.Linq;
using Travel.Database.Model;

namespace Travel.Database.Utilities
{
    public class ManageUserFacebookData
    {
        public void StoreUser(User user)
        {
            IDocumentStore store;
            using (store = DatabaseConnection.DocumentStoreInitialization())
            {
                using (IDocumentSession session = store.OpenSession())
                {
                    var existingUser = session.Query<User>().Any(x => x.UserId == user.UserId);
                    if(!existingUser)
                    {
                        session.Store(user);
                        session.SaveChanges();
                    }
                }
            }
        }

        public void StoreUserProfile(UserProfile userProfile)
        {
            IDocumentStore store;
            using (store = DatabaseConnection.DocumentStoreInitialization())
            {
                using (IDocumentSession session = store.OpenSession())
                {
                    var existingUserProfile = session.Query<UserProfile>().FirstOrDefault(x => x.UserId == userProfile.UserId);
                    if (existingUserProfile != null)
                    {
                        #region Update Facebook Events
                        var existingFbEventIds = existingUserProfile.FacebookEvents.Select(e => e.EventId).ToList();
                        var newFbEventIds = userProfile.FacebookEvents.Select(e => e.EventId).ToList();
                        // ako su eventi razliciti, treba nove dodati u bazu (stare zadržati)
                        var areFbEventsEqual = existingFbEventIds.SequenceEqual(newFbEventIds);
                        if (!areFbEventsEqual)
                        {
                            session.Advanced.Patch(existingUserProfile, x => x.FacebookEvents, userProfile.FacebookEvents);
                        }
                        #endregion

                        #region Update Facebook Groups
                        var existingFbGroupIds = existingUserProfile.FacebookGroups.Select(e => e.GroupId).ToList();
                        var newFbGroupIds = userProfile.FacebookGroups.Select(e => e.GroupId).ToList();
                        var areFbGroupsEqual = existingFbGroupIds.SequenceEqual(newFbGroupIds);
                        if (!areFbGroupsEqual)
                        {
                            session.Advanced.Patch(existingUserProfile, x => x.FacebookGroups, userProfile.FacebookGroups);
                        }
                        #endregion

                        #region Update Facebook Likes
                        var existingFbLikeIds = existingUserProfile.FacebookLikes.Select(e => e.LikedPageId).ToList();
                        var newFbLikeIds = userProfile.FacebookLikes.Select(e => e.LikedPageId).ToList();
                        var areFbLikesEqual = existingFbLikeIds.SequenceEqual(newFbLikeIds);
                        if (!areFbLikesEqual)
                        {
                            session.Advanced.Patch(existingUserProfile, x => x.FacebookLikes, userProfile.FacebookLikes);
                        }
                        #endregion

                        #region Update Facebook Tagged Places
                        var existingFbTaggedPlaceIds = existingUserProfile.FacebookTaggedPlaces.Select(e => e.TaggedPlaceId).ToList();
                        var newFbTaggedPlaceIds = userProfile.FacebookTaggedPlaces.Select(e => e.TaggedPlaceId).ToList();
                        var areFbTaggedPlacesEqual = existingFbTaggedPlaceIds.SequenceEqual(newFbTaggedPlaceIds);
                        if (!areFbTaggedPlacesEqual)
                        {
                            session.Advanced.Patch(existingUserProfile, x => x.FacebookTaggedPlaces, userProfile.FacebookTaggedPlaces);
                        }
                        #endregion

                        #region Update Preferences
                        var existingPreferences = existingUserProfile.Preferences;
                        var newPreferences = userProfile.Preferences;
                        var arePreferencesEqual = existingPreferences.SequenceEqual(newPreferences);
                        if (!arePreferencesEqual)
                        {
                            session.Advanced.Patch(existingUserProfile, x => x.Preferences, userProfile.Preferences);
                        }
                        #endregion

                        #region Update Visited Citys Ids
                        /*smisli logiku*/
                        #endregion
                    }
                    else
                    {
                        session.Store(userProfile);
                    }

                    session.SaveChanges();
                }
            }
        }
    }
}
