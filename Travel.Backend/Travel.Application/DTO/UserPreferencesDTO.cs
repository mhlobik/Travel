﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Travel.Database.Model;

namespace Travel.Application.DTO
{
    public class UserPreferencesDTO
    {
        public string UserId { get; set; }
        public List<string> Preferences { get; set; }
        public int MaxTravelPrice { get; set; }
        public int MaxFlightPrice { get; set; }
    }
}
