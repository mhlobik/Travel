using System.Collections.Generic;

namespace Travel.Database.Model
{
    public class Hotel
    {
        public string HotelId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Website { get; set; }
        public string GoogleMapsUrl { get; set; }
        public string UserRating { get; set; }
        /*public List<Amenity> Amenities { get; set; }
        public List<Contact> contacts { get; set; }
        public string Description { get; set; }
        public MinDailyRate MinDailyRate { get; set; }
        public string PropertyCode { get; set; }
        public decimal TotalPrice { get; set; }*/
    }
}
