using Microsoft.Owin.Cors;
using Newtonsoft.Json.Serialization;
using Owin;
using System;
using System.Net;
using System.Threading.Tasks;
using System.Web.Cors;
using System.Web.Http;

namespace Travel.Application
{
    public class Startup
    {
        public void Configuration(IAppBuilder appBuilder)
        {
            configureCors(appBuilder);
            configureWindowsAuthentication(appBuilder);

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

        private static void configureCors(IAppBuilder appBuilder)
        {
            var corsPolicy = new CorsPolicy()
            {
                AllowAnyHeader = true,
                AllowAnyOrigin = true,
                SupportsCredentials = true,
                AllowAnyMethod = true
            };
            corsPolicy.ExposedHeaders.Add("x-crypto");
            corsPolicy.ExposedHeaders.Add("Content-Length");

            appBuilder.UseCors(new CorsOptions
            {
                PolicyProvider = new CorsPolicyProvider
                {
                    PolicyResolver = context => Task.FromResult(corsPolicy)
                }
            });
        }

        private static void configureWindowsAuthentication(IAppBuilder appBuilder)
        {
            var httpListener = (HttpListener)appBuilder.Properties["System.Net.HttpListener"];
            httpListener.AuthenticationSchemeSelectorDelegate = request =>
            {
                if (request.Url.AbsolutePath.StartsWith("/signalr"))
                {
                    return AuthenticationSchemes.Anonymous;
                }
                else
                {
                    if ("OPTIONS".Equals(request.HttpMethod, StringComparison.OrdinalIgnoreCase))
                    {
                        return AuthenticationSchemes.Anonymous;
                    }
                    else
                    {
                        return AuthenticationSchemes.Ntlm;
                    }
                }
            };
        }
    }
}
