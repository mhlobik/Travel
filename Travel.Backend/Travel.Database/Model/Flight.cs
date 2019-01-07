using System;
using System.Collections.Generic;

namespace Travel.Database.Model
{
    public class Flight
    {
        public string Airline { get; set; }
        public Fare FlightFare { get; set; }
        public string DeepLink { get; set; }
        public List<FlightDetails> Inbound { get; set; }
        public DateTime InboundDuration { get; set; }
        public List<FlightDetails> Outbound { get; set; }
        public DateTime OutboundDuration { get; set; }
        public string TravelClass { get; set; }
    }
}
