using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Travel.Business.Recommenders;
using Travel.Database.Model;
using Travel.Database.Utilities;

namespace Travel.Application.ApiControllers
{
    public class RecommendationController : ApiController
    {
        [Route("api/recommendation/get-top-cities")]
        [HttpGet]
        public IHttpActionResult GetTopCities()
        {
            var manager = new TopCitiesOnTravel();
            var recommendations = manager.GetTopCitiesOnTravel();
            return Ok(recommendations);

        }

        [Route("api/recommendation/get-knowledge-based/{userId}")]
        [HttpGet]
        public IHttpActionResult GetKnowledgeBased(string userId)
        {
            var manager = new KnowledgeBased();
            var recommendations = manager.GetKnowledgeBasedRecommendations(userId);
            return Ok(recommendations);
        }

        [Route("api/recommendation/get-collaborative-filtering/{userId}")]
        [HttpGet]
        public IHttpActionResult GetCollaborativeFiltering(string userId)
        {
            var manager = new CollaborativeFiltering();
            var recommendations = manager.GetCollaborativeFiltering(userId);
            return Ok(recommendations);
        }

        [Route("api/recommendation/get-content-based/{userId}")]
        [HttpGet]
        public IHttpActionResult GetContentBased(string userId)
        {
            var manager = new ContentBased();
            var recommendations = manager.GetContentBased(userId);
            return Ok(recommendations);
        }

        [Route("api/recommendation/save-recommendation")]
        [HttpPost]
        public IHttpActionResult SaveRecommendationRating([FromBody] Recommendation recommendation)
        {
            var manager = new ManageCityData();
            manager.SaveRecommendation(recommendation);
            return Ok();
        }

        [Route("api/recommendation/get-recommendation-rating")]
        [HttpPost]
        public IHttpActionResult GetRecommendationRating([FromBody] Recommendation recommendation)
        {
            var manager = new ManageCityData();
            var recommendationDatabase = manager.GetRecommendation(recommendation);
            return Ok(recommendationDatabase);
        }

        [Route("api/recommendation/get-specific-recommendation")]
        [HttpPost]
        public IHttpActionResult GetSpecificRecommendation([FromBody] Recommendation recommendation)
        {
            var specificRecommendations = new SpecificRecommendations();
            var recommendations = Task.Run(async () => await specificRecommendations.GetSpecificRecommendations(recommendation)).ConfigureAwait(false).GetAwaiter().GetResult();
            return Ok(recommendations);
        }
    }
}
