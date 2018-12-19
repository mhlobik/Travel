using Travel.Business.Watson;
using Travel.Database.Model;
using Travel.Database.Utilities;

namespace Travel.Business.Facebook
{
    public class UserProfileManager
    {
        public bool ParseAndStoreUserProfile(UserProfile userProfile)
        {
            var textAnalysisManager = new FacebookTextAnalysis(); // opcenito analiza treba provjeriti kategorija i breakat ak nije ono sto me zanima?

            #region Parse Facebook Events
            var fbEventsAnalysis = textAnalysisManager.FacebookEventsTextAnalysis(userProfile.FacebookEvents);
            #endregion

            #region Parse Facebook Groups
            var fbGroupsAnalysis = textAnalysisManager.FacebookGroupsTextAnalysis(userProfile.FacebookGroups);
            #endregion

            #region Parse Facebook Likes
            var fbLikesAnalysis = textAnalysisManager.FacebookLikesTextAnalysis(userProfile.FacebookLikes);

            #endregion

            #region Parse Facebook Tagged Places
            // samo city parse
            #endregion

            ManageUserFacebookData databaseManager = new ManageUserFacebookData();
            var isStored = databaseManager.StoreUserProfile(userProfile);

            return isStored;

        }
    }
}
