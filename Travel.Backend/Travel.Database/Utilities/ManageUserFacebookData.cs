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
                        var fbEvents = existingUserProfile.FacebookEvents;
                        if (fbEvents != null)
                        {
                            foreach (var oldEvent in fbEvents)
                            {
                                if (!userProfile.FacebookEvents.Any(x => x.EventId.Equals(oldEvent.EventId)))
                                {
                                    userProfile.FacebookEvents.Add(oldEvent);
                                }
                            }
                        }
                        session.Advanced.Patch(existingUserProfile, x => x.FacebookEvents, userProfile.FacebookEvents);
                        #endregion

                        #region Update Facebook Groups
                        var fbGroups = existingUserProfile.FacebookGroups;
                        if (fbGroups != null)
                        {
                            foreach (var oldGroup in fbGroups)
                            {
                                if (!userProfile.FacebookGroups.Any(x => x.GroupId.Equals(oldGroup.GroupId)))
                                {
                                    userProfile.FacebookGroups.Add(oldGroup);
                                }
                            }
                        }
                        session.Advanced.Patch(existingUserProfile, x => x.FacebookGroups, userProfile.FacebookGroups);

                        #endregion

                        #region Update Facebook Likes
                        var fbLikes = existingUserProfile.FacebookLikes;
                        if (fbLikes != null)
                        {
                            foreach (var oldLike in fbLikes)
                            {
                                if (!userProfile.FacebookLikes.Any(x => x.LikedPageId.Equals(oldLike.LikedPageId)))
                                {
                                    userProfile.FacebookLikes.Add(oldLike);
                                }
                            }
                        }

                        session.Advanced.Patch(existingUserProfile, x => x.FacebookLikes, userProfile.FacebookLikes);

                        #endregion

                        #region Update Facebook Tagged Places
                        var fbTaggedPlaces = existingUserProfile.FacebookTaggedPlaces;
                        if(fbTaggedPlaces != null)
                        {
                            foreach (var oldPlace in fbTaggedPlaces)
                            {
                                if (!userProfile.FacebookTaggedPlaces.Any(x => x.TaggedPlaceId.Equals(oldPlace.TaggedPlaceId)))
                                {
                                    userProfile.FacebookTaggedPlaces.Add(oldPlace);
                                }
                            }
                        }

                        session.Advanced.Patch(existingUserProfile, x => x.FacebookTaggedPlaces, userProfile.FacebookTaggedPlaces);

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
                        var existingVisitedCityIds = existingUserProfile.VisitedCityIds;

                        if(existingVisitedCityIds != null)
                        {
                            foreach (var old in existingVisitedCityIds)
                            {
                                if (!userProfile.VisitedCityIds.Equals(old))
                                {
                                    userProfile.VisitedCityIds.Add(old);
                                }
                            }
                        }


                        session.Advanced.Patch(existingUserProfile, x => x.VisitedCityIds, userProfile.VisitedCityIds);
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
                            session.Advanced.Patch(existingUserProfile, x => x.Duration, userProfile.Duration);
                            session.Advanced.Patch(existingUserProfile, x => x.MonthSelected, userProfile.MonthSelected);
                            session.Advanced.Patch(existingUserProfile, x => x.MonthPartSelected, userProfile.MonthPartSelected);
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
