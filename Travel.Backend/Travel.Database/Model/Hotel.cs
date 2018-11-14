using System.Collections.Generic;

namespace Travel.Database.Model
{
    public class Hotel
    {
        public Address Address { get; set; }
        public List<Amenity> Amenities { get; set; }
        public List<Contact> contacts { get; set; }
        public string Description { get; set; }
        public MinDailyRate MinDailyRate { get; set; }
        public string PropertyCode { get; set; }
        public string PropertyName { get; set; }
        public decimal TotalPrice { get; set; }
    }
}
