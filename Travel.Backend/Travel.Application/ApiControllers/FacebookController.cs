using Travel.Database.Model;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Travel.Application.ApiControllers
{
    public class FacebookController : ApiController
    {
        [Route("api/facebook/manage-user-facebook-data")]
        [HttpPost]
        public IHttpActionResult ManageUserFacebookData([FromBody] User user)
        {
            var test = user;
            return Ok();
        }

        [Route("api/facebook/manage-user-profile-facebook-data")]
        [HttpPost]
        public IHttpActionResult ManageUserProfileFacebookData([FromBody] UserProfile userProfile)
        {
            var test = userProfile;
            return Ok();
        }

        [Route("api/facebook/test")]
        [HttpGet]
        public IHttpActionResult Test()
        {
            var test = "bla";
            return Ok();
        }
    }
}
