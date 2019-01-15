using Travel.Database.Model;
using System.Web.Http;
using System.Web.Http.Cors;
using Travel.Database;
using Travel.Database.Utilities;
using Travel.Business.Watson;
using Travel.Business.Facebook;
using Travel.Application.DTO;

namespace Travel.Application.ApiControllers
{
    public class FacebookController : ApiController
    {
        [Route("api/facebook/manage-user-facebook-data")]
        [HttpPost]
        public IHttpActionResult ManageUserFacebookData([FromBody] User user)
        {
            ManageUserFacebookData databaseManager = new ManageUserFacebookData();
            databaseManager.StoreUser(user);
            return Ok(user);
        }

        [Route("api/facebook/manage-user-profile-facebook-data")]
        [HttpPost]
        public IHttpActionResult ManageUserProfileFacebookData([FromBody] UserProfile userProfile)
        {
            var userPofileManager = new UserProfileManager();
            var isStored = userPofileManager.ParseAndStoreUserProfile(userProfile);

            return Ok(userProfile);
        }

        [Route("api/facebook/get-users")]
        [HttpGet]
        public IHttpActionResult GetUsers()
        {
            ManageUserFacebookData databaseManager = new ManageUserFacebookData();
            var allUsers = databaseManager.GetAllUsers();
            return Ok(allUsers);
        }

        [Route("api/facebook/get-user-profile/{userId}")]
        [HttpGet]
        public IHttpActionResult GetUserProfile(string userId)
        {
            var databaseManager = new ManageUserFacebookData();
            var userProfile = databaseManager.GetUserProfile(userId);
            return Ok(userProfile);
        }
    }
}
