﻿using System;
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
        [Route("api/recommendation/get-knowledge-based/{userId}")]
        [HttpGet]
        public IHttpActionResult GetKnowledgeBased(string userId)
        {
            var manager = new KnowledgeBased();
            var recommendations = manager.GetKnowledgeBasedRecommendations(userId);
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
    }
}
