using System;

namespace Travel.Database.Model
{
    public class FlightViewModel
    {
        public string From { get; set; }
        public string To { get; set; }
        public decimal TotalPrice { get; set; }
        public string Currency { get; set; }
        public string OutboundDuration { get; set; }
        public string InboundDuration { get; set; }
        public string Link { get; set; }
    }
}
