using System;
using Microsoft.Owin.Hosting;

namespace Travel.Application
{
    public class TravelApplication : IDisposable
    {
        private readonly int _listeningPort;
        private IDisposable _internalWebApp;

        public TravelApplication()
        {
            var globalSettings = GlobalSettings.Instance;
            _listeningPort = globalSettings.Port;
        }

        public TravelApplication(int listeningPort)
        {
            var globalSettings = GlobalSettings.Instance;
            _listeningPort = listeningPort;
        }

        public void StartApplication()
        {
            var options = new StartOptions();

            options.Urls.Add($"http://{Environment.MachineName}:{_listeningPort}");
            options.Urls.Add($"http://localhost:{_listeningPort}");
            options.Urls.Add($"http://127.0.0.1:{_listeningPort}");

            _internalWebApp = WebApp.Start<Startup>(options);
        }

        public void Dispose()
        {
            _internalWebApp?.Dispose();
        }
    }
}