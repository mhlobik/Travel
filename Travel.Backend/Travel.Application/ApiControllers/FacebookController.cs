using Travel.Database.Model;
using System.Web.Http;

namespace Travel.Application.ApiControllers
{
    [RoutePrefix("facebook")]
    public class FacebookController : ApiController
    {
        [Route("manage-facebook-data")]
        [HttpPost]
        public IHttpActionResult ManageFacebookData([FromBody] User user)
        {
            var test = user;
            return Ok();
        }

        [Route("test")]
        [HttpGet]
        public IHttpActionResult Test()
        {
            var test = "bla";
            return Ok();
        }
    }
}
