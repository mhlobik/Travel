namespace Travel.Database.Model
{
    public class CityRating
    {
        public string CityId { get; set; }
        public string UserId { get; set; }
        public bool Liked { get; set; }
    }
}
