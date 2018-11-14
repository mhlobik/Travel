using System.Collections.Generic;
using Travel.Database.Enums;

namespace Travel.Database.Model
{
    public class Recommendation
    {
        public int UserId { get; set; }
        public int RecommendationId { get; set; }
        public RecommenderModelEnum RecommenderModel { get; set; }
        public List<int> RecommendedCityId { get; set; }
    }
}
