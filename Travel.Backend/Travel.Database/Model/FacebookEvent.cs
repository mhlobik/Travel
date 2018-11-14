namespace Travel.Database.Model
{
    public class FacebookEvent
    {
        public string EventDescription { get; set; }
        public TextAnalysis EventDescriptionAnalysis { get; set; }
        public string EventId { get; set; }
        public string EventName { get; set; }
        public TextAnalysis EventNameAnalysis { get; set; }
        public string EventPlaceCity { get; set; }
        public string EventPlaceCountry { get; set; }
        public string EventRSVPStatus { get; set; }
    }
}
