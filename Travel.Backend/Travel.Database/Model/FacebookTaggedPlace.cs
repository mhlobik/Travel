namespace Travel.Database.Model
{
    public class FacebookTaggedPlace
    {
        public string City { get; set; }
        public string Country { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public string Name { get; set; }
        public TextAnalysis NameAnalysis { get; set; }
    }
}
