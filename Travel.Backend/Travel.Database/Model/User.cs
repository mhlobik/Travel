using System.Collections.Generic;

namespace Travel.Database.Model
{
    public class User
    {
        public string Email { get; set; }
        public List<FacebookPermission> FacebookPermissions { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserId { get; set; }
    }

}
