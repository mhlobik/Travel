using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using Travel.Business.Utilities;
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

        [Route("api/city/get-image-url")]
        [HttpPost]
        public IHttpActionResult GetImageUrl([FromBody] City city)
        {
            var manager = new CityPointsOfInterestManager();
            var result = Task.Run(async () => await manager.GetPointOfInterestsImages(city)).ConfigureAwait(false).GetAwaiter().GetResult();
            return Ok(result);
        }

        [Route("api/city/save-city-rating")]
        [HttpPost]
        public IHttpActionResult SaveCityRating([FromBody] CityRating cityRating)
        {
            var manager = new ManageCityData();
            manager.SaveCityRating(cityRating);
            return Ok();
        }
    }
}
