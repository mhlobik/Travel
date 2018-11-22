using Travel.Database.Model;
using System.Web.Http;

namespace Travel.Application.ApiControllers
{
    public class FacebookController : ApiController
    {
        [Route("api/facebook/manage-facebook-data")]
        [HttpPost]
        public IHttpActionResult ManageFacebookData([FromBody] User user)
        {
            var test = user;
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
