using System.Collections.Generic;
using Travel.Database.Enums;

namespace Travel.Database.Model
{
    public class Recommendation
    {
        public string UserId { get; set; }
        public RecommenderModelEnum RecommenderModel { get; set; }
        public City RecommendedCity { get; set; }
        public double Similarity { get; set; }
        public int Rating { get; set; }
    }
}
