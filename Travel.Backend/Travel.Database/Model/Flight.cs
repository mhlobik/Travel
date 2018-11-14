namespace Travel.Database.Model
{
    public class Flight
    {
        public string Airline { get; set; }
        public Fare FlightFare { get; set; }
        public string DeepLink { get; set; }
        public FlightDetails Inbound { get; set; }
        public FlightDetails Outbound { get; set; }
        public string TravelClass { get; set; }
    }
}
