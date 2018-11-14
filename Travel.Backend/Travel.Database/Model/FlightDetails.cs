using System;

namespace Travel.Database.Model
{
    public class FlightDetails
    {
        public string Aircraft { get; set; }
        public DateTimeOffset Arrives_at { get; set; }
        public DateTimeOffset Departs_at { get; set; }
        public AirportInfo Destination { get; set; }
        public DateTime Duration { get; set; }
        public string FlightNumber { get; set; }
        public string MarketingAirline { get; set; }
        public string OperatingAirline { get; set; }
        public AirportInfo Origin { get; set; }
        public int SeatsRemaining { get; set; }
    }
}
