using Travel.Database.Enums;

namespace Travel.Database.Model
{
    public class RecommenderModelRating
    {
        public int UserId { get; set; }
        public int RecommendationId { get; set; }
        public RecommenderModelEnum RecommenderModel { get; set; }
        public int Rating { get; set; }
    }
}
