using System;
using System.Collections.Generic;
using System.Web.Http;
using Travel.Application.DTO;
using Travel.Database.Enums;
using Travel.Database.Model;
using Travel.Database.Utilities;

namespace Travel.Application.ApiControllers
{
    public class MainController : ApiController
    {
        [Route("api/main/save-user-preferences")]
        [HttpPost]
        public IHttpActionResult SaveUserPreferences([FromBody] UserPreferencesDTO userPreferences)
        {
            var prefernceList = new List<PointsOfInterestCategoriesEnum>();
            foreach(var preference in userPreferences.Preferences)
            {
                prefernceList.Add((PointsOfInterestCategoriesEnum) Convert.ToInt32(preference));
            }

            ManageUserFacebookData databaseManager = new ManageUserFacebookData();
            databaseManager.StoreUserPreferences(
                new UserProfile()
                {
                    UserId = userPreferences.UserId,
                    Preferences = prefernceList,
                    MaxFlightPrice = userPreferences.MaxFlightPrice,
                    Duration = userPreferences.Duration,
                    MonthSelected = Int32.Parse(userPreferences.MonthSelected),
                    MonthPartSelected = userPreferences.MonthPartSelected
                });

            return Ok();
        }
    }
}
