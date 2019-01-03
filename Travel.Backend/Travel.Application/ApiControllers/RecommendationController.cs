using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Travel.Business.Recommenders;

namespace Travel.Application.ApiControllers
{
    public class RecommendationController : ApiController
    {
        [Route("api/recommendation/get-knowledge-based/{userId}")]
        [HttpGet]
        public IHttpActionResult GetKnowledgeBased(string userId)
        {
            var manager = new KnowledgeBased();
            var recommendations = manager.GetKnowledgeBasedRecommendations(userId);
            return Ok(recommendations);
        }
    }
}
