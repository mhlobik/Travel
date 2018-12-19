using System.Collections.Generic;
using System.Web.Http;
using Travel.Database.Model;
using Travel.Database.Utilities;

namespace Travel.Application.ApiControllers
{
    public class CityController : ApiController
    {
        [Route("api/city/get-city-chooser")]
        [HttpGet]
        public IHttpActionResult GetCityChooserData()
        {
            var manageCityData = new ManageCityData();
            var cities = manageCityData.GetCitiesForChooser();
            return Ok(cities);
        }

        [Route("api/city/save-selected-cities")]
        [HttpPost]
        public IHttpActionResult StoreCityChooserRatings([FromBody] List<CityRating> cityRatings)
        {
            var manageCityData = new ManageCityData();
            var isStored = manageCityData.StoreCityChooserRatings(cityRatings);
            return Ok();
        }
    }
}
