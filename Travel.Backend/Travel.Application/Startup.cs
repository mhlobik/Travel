using Newtonsoft.Json.Serialization;
using Owin;
using System.Web.Http;
using System.Web.Http.ExceptionHandling;

namespace Travel.Application
{
    public class Startup 
    {
        public void Configuration(IAppBuilder appBuilder)
        {
            var config = new HttpConfiguration();

            config.MapHttpAttributeRoutes();

            //config.Services.Add(typeof(IExceptionLogger), ""); //add new log

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            config.Formatters.Remove(config.Formatters.XmlFormatter);

            appBuilder.UseWebApi(config);
        }
    }
}
