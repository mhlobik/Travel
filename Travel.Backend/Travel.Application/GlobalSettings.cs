using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using System;
using System.IO;

namespace Travel.Application
{
    public class GlobalSettings
    {
        private static GlobalSettings _settingsInstance = null;
        private FileSystemWatcher _watcher;

        private static readonly string _hostname = Environment.MachineName;

        private static int _defaultPort = 3035;

        private static int _defaultExecutionTimeout = 600;

        public static readonly string SettingsDirectory = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.CommonApplicationData), "Travel\\");

        private static string path = Path.Combine(SettingsDirectory, "settings.json");

        public static GlobalSettings Instance
        {
            get
            {
                if (_settingsInstance == null)
                {
                    _settingsInstance = new GlobalSettings();
                    _settingsInstance.InitializeChangeSettingsListener();
                }
                return _settingsInstance;
            }
        }

        public int Port { get; set; }

        public string HostName => _hostname;

        public string TravelEndpointUrl { get; set; }

        public int ExecutionTimeout { get; set; }

        public string RegisteredTo { get; set; }

        private GlobalSettings()
        {
            Port = _defaultPort;
            TravelEndpointUrl = $"http://{HostName}:{_defaultPort}";
            ExecutionTimeout = _defaultExecutionTimeout;
        }

        public GlobalSettings GetSettings()
        {
            return _settingsInstance;
        }

        private void serializeChanges(GlobalSettings settings)
        {
            var serializer = new JsonSerializer
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver(),
                NullValueHandling = NullValueHandling.Ignore
            };
            serializer.Converters.Add(new JavaScriptDateTimeConverter());

            using (var fileStream = File.Open(path, FileMode.Create))
            using (var streamWriter = new StreamWriter(fileStream))
            using (var writer = new JsonTextWriter(streamWriter))
            {
                serializer.Serialize(writer, settings);
            }
        }

        public void SaveSettings(int port, string connectionString)
        {
            var settings = this;

            settings.Port = port;
            settings.TravelEndpointUrl = $"http://{_hostname}:{port}";

            serializeChanges(settings);
        }

        private void InitializeChangeSettingsListener()
        {

            var settings = this;
            var serializer = new JsonSerializer
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver(),
                NullValueHandling = NullValueHandling.Ignore
            };
            serializer.Converters.Add(new JavaScriptDateTimeConverter());

            if (!File.Exists(path))
            {
                Directory.CreateDirectory(Path.GetDirectoryName(path));

                using (var fileStream = File.Open(path, FileMode.Create))
                using (var streamWriter = new StreamWriter(fileStream))
                using (var writer = new JsonTextWriter(streamWriter))
                {
                    serializer.Serialize(writer, settings);
                }
            }
            else
            {
                try
                {
                    var serializedSettings = JsonConvert.DeserializeObject<GlobalSettings>(File.ReadAllText(path));
                    settings = serializedSettings;
                }
                catch (Exception ex)
                {
                    //Log.WriteException(ex, "An exception occured while reading settings data, default settings will be used");
                }

            }
            _settingsInstance = settings;

            var watcher = new FileSystemWatcher
            {
                Path = SettingsDirectory,
                NotifyFilter = NotifyFilters.LastWrite | NotifyFilters.CreationTime,
                Filter = "settings.json"
            };

            // Add event handlers.
            //watcher.Changed += new FileSystemEventHandler(OnChanged);
            watcher.Created += new FileSystemEventHandler(OnChanged);

            // Begin watching.
            watcher.EnableRaisingEvents = true;

            _watcher = watcher;

        }

        private void OnChanged(object source, FileSystemEventArgs e)
        {

            try
            {
                string jsonString;
                using (var stream = File.Open(path, FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
                {
                    using (var reader = new StreamReader(stream))
                    {
                        jsonString = reader.ReadToEnd();
                    }
                }
                if (!string.IsNullOrEmpty(jsonString))
                {
                    Instance.copySettings(JsonConvert.DeserializeObject<GlobalSettings>(jsonString));
                }

            }
            catch (Exception ex)
            {
                //Log.WriteException(ex, "An exception occured while reading new settings data");
            }

        }

        private void copySettings(GlobalSettings settings)
        {
            Port = settings.Port;
            ExecutionTimeout = settings.ExecutionTimeout;
            RegisteredTo = settings.RegisteredTo;
        }

        public void SaveRegisteredTo(string registeredTo)
        {
            var settings = Instance;
            settings.RegisteredTo = registeredTo;
            serializeChanges(settings);
        }
    }
}
