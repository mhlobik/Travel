using System;

namespace Travel.Database.Model
{
    public class FlightDetails
    {
        public string Aircraft { get; set; }
        public DateTimeOffset ArrivesAt { get; set; }
        public DateTimeOffset DepartsAt { get; set; }
        //public Airport Destination { get; set; }
        public string Destination { get; set; }
        public string FlightNumber { get; set; }
        public string MarketingAirline { get; set; }
        public string OperatingAirline { get; set; }
        //public Airport Origin { get; set; }
        public Airport Origin { get; set; }
        public int SeatsRemaining { get; set; }
    }
}
