using System;

namespace Travel.Business.CityManager
{
    public class FlightDTO
    {
        public string Origin { get; set; }
        public string Destination { get; set; }
        public DateTime DepartureDate { get; set; }
        public DateTime ReturnDate { get; set; }
    }
}
