using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using Travel.Business.CityManager;
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

        [Route("api/city/get-flights")]
        [HttpPost]
        public IHttpActionResult GetCityFlights([FromBody] FlightDTO flightInfo)
        {
            var travelManager = new TravelAmadeusManager();
            var result = Task.Run(async () => await travelManager.GetFlights(flightInfo)).ConfigureAwait(false).GetAwaiter().GetResult();

            return Ok(result);
        }

        [Route("api/city/get-rating/{cityId}")]
        [HttpGet]
        public IHttpActionResult GetCityRating(string cityId)
        {
            var databaseManager = new ManageCityData();
            var rating = databaseManager.GetCityRating(cityId);
            return Ok(rating);
        }

        [Route("api/city/get-hotels")]
        [HttpPost]
        public IHttpActionResult GetCityHotels(City city)
        {
            var hotelsManager = new CityHotelsManager();
            var hotels = Task.Run(async () => await hotelsManager.GetHotels(city)).ConfigureAwait(false).GetAwaiter().GetResult();
            return Ok(hotels);
        }
    }
}