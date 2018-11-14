namespace Travel.Database.Model
{
    public class FacebookGroup
    {
        public string GroupDescription { get; set; }
        public TextAnalysis GroupDescriptionAnalysis { get; set; }
        public string GroupId { get; set; }
        public string GroupName { get; set; }
        public TextAnalysis GroupNameAnalysis { get; set; }
        public string GroupPurpose { get; set; }
        public string GroupVenueCity { get; set; }
    }
}
