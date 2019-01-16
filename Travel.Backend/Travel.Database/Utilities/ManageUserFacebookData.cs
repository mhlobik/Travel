using Microsoft.VisualStudio.TestTools.UnitTesting;
using Raven.Client.Documents;
using Raven.Client.Documents.Session;
using System;
using System.Collections.Generic;
using System.Linq;
using Travel.Database.Model;

namespace Travel.Database.Utilities
{
    public class ManageUserFacebookData
    {
        public List<User> GetAllUsers()
        {
            IDocumentStore store;
            var users = new List<User>();

            using (store = DatabaseConnection.DocumentStoreInitialization())
            {
                using (IDocumentSession session = store.OpenSession())
                {
                    users = session.Query<User>().ToList();
                }
            }

            return users;
        }

        public void StoreUser(User user)
        {
            IDocumentStore store;
            using (store = DatabaseConnection.DocumentStoreInitialization())
            {
                using (IDocumentSession session = store.OpenSession())
                {
                    var existingUser = session.Query<User>().Any(x => x.UserId == user.UserId);
                    if (!existingUser)
                    {
                        session.Store(user);
                        session.SaveChanges();
                    }
                }
            }
        }

        public bool StoreUserProfile(UserProfile userProfile)
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
                        var existingFbEvents = existingUserProfile.FacebookEvents;
                        var newFbEvents = userProfile.FacebookEvents;
                        // ako su eventi razliciti, treba nove dodati u bazu (stare zadržati)
                        var areFbEventsEqual = (existingFbEvents != null) ? existingFbEvents.SequenceEqual(newFbEvents) : false;
                        if (!areFbEventsEqual)
                        {
                            session.Advanced.Patch(existingUserProfile, x => x.FacebookEvents, userProfile.FacebookEvents);
                        }
                        #endregion

                        #region Update Facebook Groups
                        var existingFbGroups = existingUserProfile.FacebookGroups;
                        var newFbGroups = userProfile.FacebookGroups;
                        var areFbGroupsEqual = (existingFbGroups != null) ? existingFbGroups.SequenceEqual(newFbGroups) : false;
                        if (!areFbGroupsEqual)
                        {
                            session.Advanced.Patch(existingUserProfile, x => x.FacebookGroups, userProfile.FacebookGroups);
                        }
                        #endregion

                        #region Update Facebook Likes
                        var existingFbLikes = existingUserProfile.FacebookLikes;
                        var newFbLikes = userProfile.FacebookLikes;
                        var areFbLikesEqual = (existingFbLikes != null) ? existingFbLikes.SequenceEqual(newFbLikes) : false;
                        if (!areFbLikesEqual)
                        {
                            session.Advanced.Patch(existingUserProfile, x => x.FacebookLikes, userProfile.FacebookLikes);
                        }
                        #endregion

                        #region Update Facebook Tagged Places
                        var existingFbTaggedPlaces = existingUserProfile.FacebookTaggedPlaces;
                        var newFbTaggedPlaces = userProfile.FacebookTaggedPlaces;
                        var areFbTaggedPlacesEqual = (existingFbTaggedPlaces != null) ? existingFbTaggedPlaces.SequenceEqual(newFbTaggedPlaces) : false;
                        if (!areFbTaggedPlacesEqual)
                        {
                            session.Advanced.Patch(existingUserProfile, x => x.FacebookTaggedPlaces, userProfile.FacebookTaggedPlaces);
                        }
                        #endregion

                        #region Update Preferences
                        var existingPreferences = existingUserProfile.Preferences;
                        var newPreferences = userProfile.Preferences;
                        var arePreferencesEqual = (existingPreferences != null) && (newPreferences != null) ? existingPreferences.Equals(newPreferences) : true;
                        if (!arePreferencesEqual)
                        {
                            session.Advanced.Patch(existingUserProfile, x => x.Preferences, userProfile.Preferences);
                        }
                        #endregion

                        #region Update Location
                        var existingLocation = existingUserProfile.LocationName;
                        var newLocation = userProfile.LocationName.Split(',')[0];
                        var areLocationsEqual = (existingLocation != null) && (newLocation != null) ? existingLocation.Equals(newLocation) : false;
                        if (!areLocationsEqual)
                        {
                            session.Advanced.Patch(existingUserProfile, x => x.LocationName, newLocation);
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

                    try
                    {
                        session.SaveChanges();
                        return true;
                    }
                    catch (Exception ex)
                    {
                        return false;
                    }
                }
            }
        }

        public bool StoreUserPreferences(UserProfile userProfile)
        {
            IDocumentStore store;
            using (store = DatabaseConnection.DocumentStoreInitialization())
            {
                using (IDocumentSession session = store.OpenSession())
                {
                    var existingUserProfile = session.Query<UserProfile>().FirstOrDefault(x => x.UserId == userProfile.UserId);
                    if (existingUserProfile != null)
                    {
                        #region Update Preferences
                        var existingPreferences = existingUserProfile.Preferences;
                        var newPreferences = userProfile.Preferences;
                        var arePreferencesEqual = (existingPreferences != null) && (newPreferences != null) ? existingPreferences.Equals(newPreferences) : false;
                        if (!arePreferencesEqual)
                        {
                            session.Advanced.Patch(existingUserProfile, x => x.Preferences, userProfile.Preferences);
                            session.Advanced.Patch(existingUserProfile, x => x.MaxFlightPrice, userProfile.MaxFlightPrice);
                            session.Advanced.Patch(existingUserProfile, x => x.MaxTravelPrice, userProfile.MaxTravelPrice);
                        }
                        #endregion
                    }
                    else
                    {
                        session.Store(userProfile);
                    }

                    try
                    {
                        session.SaveChanges();
                        return true;
                    }
                    catch (Exception ex)
                    {
                        return false;
                    }
                }
            }
        }

        public UserProfile GetUserProfile(string userId)
        {
            IDocumentStore store;
            var userProfile = new UserProfile();

            using (store = DatabaseConnection.DocumentStoreInitialization())
            {
                using (IDocumentSession session = store.OpenSession())
                {
                    userProfile = session.Query<UserProfile>().FirstOrDefault(x => x.UserId == userId);
                }
            }

            return userProfile;
        }

    }
}
