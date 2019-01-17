using Google.Cloud.Language.V1;
using Google.Protobuf.Collections;
using IBM.WatsonDeveloperCloud.NaturalLanguageUnderstanding.v1;
using IBM.WatsonDeveloperCloud.NaturalLanguageUnderstanding.v1.Model;
using IBM.WatsonDeveloperCloud.Util;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Raven.Client.Documents;
using Raven.Client.Documents.Session;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Travel.Application;
using Travel.Business.CityManager;
using Travel.Business.Recommenders;
using Travel.Business.Utilities;
using Travel.Database;
using Travel.Database.Model;
using Travel.Database.Utilities;

namespace Travel.Backend.Console
{
    public class Program
    {
        private static System.Net.Http.HttpClient Client { get; set; }

        public static void Main(string[] args)
        {
            #region Web api hosting

            var app = new TravelApplication();
            app.StartApplication();
            System.Console.WriteLine("App started!\n");
            #endregion

            #region read xls
            //Excel.Application xlApp;
            //Excel.Workbook xlWorkBook;
            //Excel.Worksheet xlWorkSheet;
            //Excel.Range range;

            //string str;
            //int rCnt;
            //int cCnt;
            //int rw = 0;
            //int cl = 0;
            //System.Console.WriteLine($"start excell thing");
            //xlApp = new Excel.Application();
            //xlWorkBook = xlApp.Workbooks.Open(@"C:\Users\Marija\Downloads\iata-airport-codes\airport-codes.csv", 0, true, 5, "", "", true, Microsoft.Office.Interop.Excel.XlPlatform.xlWindows, "\t", false, false, 0, true, 1, 0);
            //xlWorkSheet = (Excel.Worksheet)xlWorkBook.Worksheets.get_Item(1);

            //range = xlWorkSheet.UsedRange;
            //rw = range.Rows.Count;
            //cl = range.Columns.Count;

            //for (rCnt = 1; rCnt <= rw; rCnt++)
            //{
            //    for (cCnt = 1; cCnt <= cl; cCnt++)
            //    {
            //        str = (string)(range.Cells[rCnt, cCnt] as Excel.Range).Value2;
            //        var splitedRow = str.Replace("\"", "").Split(',');

            //        var airport = new Airport()
            //        {
            //            City = splitedRow[0],
            //            Name = splitedRow[1],
            //            Country = splitedRow[1].Split('-')[0],
            //            IATA = splitedRow[2]
            //        };
            //        System.Console.WriteLine($"\texcell: {str}");

            //        IDocumentStore store;
            //        using (store = DatabaseConnection.DocumentStoreInitialization())
            //        {
            //            using (IDocumentSession session = store.OpenSession())
            //            {
            //                session.Store(airport);
            //                session.SaveChanges();
            //            }
            //        }
            //    }
            //}

            //xlWorkBook.Close(true, null, null);
            //xlApp.Quit();

            //Marshal.ReleaseComObject(xlWorkSheet);
            //Marshal.ReleaseComObject(xlWorkBook);
            //Marshal.ReleaseComObject(xlApp);
            #endregion

            #region Test Knowledge Based RS
            var kbrsManager = new KnowledgeBased();
            //var test = kbrsManager.GetKnowledgeBasedRecommendations("10217668859972898");
            #endregion

            #region Foursquare API
            //var foursquareManager = new CityPointsOfInterestManager();

            //var cities111 = foursquareManager.GetCityPointsOfInterest(3537, 3538);
            //System.Console.WriteLine("GetCityPointsOfInterest(3357, 3538)");


            #endregion

            #region Delete for Google Place API
            // delete existng data from city (hotels and points of interests urls)
            //var cityDataManager = new ManageCityData();
            //var cities = cityDataManager.GetAllCities();

            //foreach (var city in cities)
            //{
            //    System.Console.WriteLine($"\t{city.Name}");
            //    var updatedCity = new City()
            //    {
            //        CityId = city.CityId,
            //        Country = city.Country,
            //        Description = city.Description,
            //        Flights = city.Flights,
            //        Hotels = null,
            //        ImageUrl = city.ImageUrl,
            //        Name = city.Name,
            //        PointsOfInterest = city.PointsOfInterest
            //    };

            //    if (city.Hotels != null)
            //    {
            //        cityDataManager.UpdateCityHotels(updatedCity);
            //    }

            //    var updatedPiList = new List<PointsOfInterest>();
            //    foreach (var pi in city.PointsOfInterest)
            //    {
            //        var updatedPi = new PointsOfInterest()
            //        {
            //            Url = null,
            //            Categories = pi.Categories,
            //            Description = pi.Description,
            //            Id = pi.Id,
            //            Name = pi.Name
            //        };

            //        updatedPiList.Add(updatedPi);
            //    }

            //    updatedCity.PointsOfInterest = updatedPiList;

            //    cityDataManager.UpdateCityPointsOfInterest(updatedCity);
            //    System.Console.WriteLine($"\t\t{city.Name} update-ani pi");
            //}
            #endregion

            //DatabaseConnection test = new DatabaseConnection();
            //test.TestCon();

            // The text to analyze.
            //string text = "Always dreamed of a movielike summer experience on one of the most beautiful coasts in the world?"
            //    + "Are you too sober for starting a new academic year ? Do you need a proper mental preparation for it?"
            //    + "Why don't you join us on a PearlJAM in Croatia from 22nd to 25th of September?"
            //    + "What is PearlJAM? 	An amazing opportunity to:  1.see some gluteus maximus tanning on the beach"
            //    + "2.get a perfect tan for your gluteus maximus"
            //    + "3.eat some good food"
            //    + "4.explore Croatian beautiful coast"
            //    + "5.find a boyfriend"
            //    + "6.find a girlfriend"
            //    + "7.find both"
            //    + "8.turn into a mermaid"
            //    + "9.attend crazy beach parties"
            //    + "10.attend more crazy boat party"
            //    + "11.meet some great people just like you"
            //    + "What it has to offer ?"
            //    + "1.partyanimal organisers ready to blow your mind"
            //    + "2.a bed for 3 nights which you won't need because you will party all night and sleep on the beach"
            //    + "3.melt -in-your - mouth food"
            //    + "4.boat party"
            //    + "5.breathtaking beaches"
            //    + "6.sky - blue sea"
            //    + "7.and plenty of surprises you will have to discover yourself";

            #region Natural Language Understanding API
            //var url = "https://gateway-fra.watsonplatform.net/natural-language-understanding/api";
            //string text = "Caen (; French pronunciation: ​[kɑ̃]; Norman: Kaem), (Caen  in French) is a commune in northwestern France. It is the prefecture of the Calvados department. The city proper has 108,365 inhabitants (as of  2012), while its urban area has 420,000, making Caen the largest city in former Lower Normandy. It is also the third largest municipality in all of Normandy after Le Havre and Rouen and the third largest city proper in Normandy, after Rouen and Le Havre,. The metropolitan area of Caen, in turn, is the second largest in Normandy after that of Rouen, the 21st largest in France.\nIt is located 15 kilometres (9.3 miles) inland from the English Channel, 200 kilometres north-west of Paris, and connected to the south of England by the Caen-(Ouistreham)-Portsmouth ferry route. Caen is located in the centre of its northern region, and it is a centre of political, economic and cultural power. Located a few miles from the coast, the landing beaches, the bustling resorts of Deauville and Cabourg, Norman Switzerland and Pays d'Auge, Caen is often considered the archetype of Normandy.\nCaen is known for its historical buildings built during the reign of William the Conqueror, who was buried there, and for the Battle for Caen—heavy fighting that took place in and around Caen during the Battle of Normandy in 1944, destroying much of the city. The city has now preserved the memory by erecting a memorial and a museum dedicated to peace, the Mémorial de Caen.";

            //var lines = System.IO.File.ReadAllLines(@"D:\Diplomski Rad\config.ts");
            //string apiKey = lines[4];
            
            //TokenOptions iamAssistantTokenOptions = new TokenOptions()
            //{
            //    IamApiKey = apiKey,
            //    ServiceUrl = url
            //};

            //NaturalLanguageUnderstandingService _naturalLanguageUnderstandingService = new NaturalLanguageUnderstandingService(iamAssistantTokenOptions, "2018-03-16");

            //Parameters parameters = new Parameters()
            //{
            //    Text = text,
            //    Features = new IBM.WatsonDeveloperCloud.NaturalLanguageUnderstanding.v1.Model.Features()
            //    {
            //        Categories = new CategoriesOptions { },
            //        Concepts = new ConceptsOptions
            //        {
            //            Limit = 5
            //        },
            //        Emotion = new EmotionOptions { },
            //        Entities = new EntitiesOptions
            //        {
            //            Sentiment = true,
            //            Limit = 10
            //        },
            //        Keywords = new KeywordsOptions()
            //        {
            //            Limit = 8,
            //            Sentiment = true,
            //            Emotion = true
            //        },
            //        Sentiment = new SentimentOptions
            //        {

            //        }
            //    }
            //};

            //var result = _naturalLanguageUnderstandingService.Analyze(parameters);
            //System.Console.WriteLine("Categories:");
            //foreach (var category in result.Categories)
            //{
            //    System.Console.WriteLine($"\tscore: {category.Score}");
            //    System.Console.WriteLine($"\tlabel: {category.Label}");
            //}

            //System.Console.WriteLine("Concepts:");
            //foreach (var concept in result.Concepts)
            //{
            //    System.Console.WriteLine($"\ttext: {concept.Text}");
            //    System.Console.WriteLine($"\trelevance: {concept.Relevance}");
            //    System.Console.WriteLine($"\tdbpedia_resource: {concept.DbpediaResource}");
            //}

            //System.Console.WriteLine("Emotion:");
            //System.Console.WriteLine($"\t: {result.Emotion.Document.Emotion}");

            //System.Console.WriteLine("Entities:");
            //foreach (var entity in result.Entities)
            //{
            //    System.Console.WriteLine($"\ttype: {entity.Type}");
            //    System.Console.WriteLine($"\ttext: {entity.Text}");
            //    System.Console.WriteLine($"\trelevance: {entity.Relevance}");
            //    System.Console.WriteLine($"\tmentions: {entity.Mentions}");
            //}

            //System.Console.WriteLine("Keywords:");
            //foreach (var keyword in result.Keywords)
            //{
            //    System.Console.WriteLine($"\ttext: {keyword.Text}");
            //    System.Console.WriteLine($"\trelevance: {keyword.Relevance}");
            //}
            //System.Console.WriteLine("Sentiment:");
            //System.Console.WriteLine($"\tLabel: {result.Sentiment.Document.Label}");
            //System.Console.WriteLine($"\tScore: {result.Sentiment.Document.Score}");

            //System.Console.WriteLine("Result:");
            //System.Console.WriteLine($"\t: {result}");
            #endregion

            #region Google Language Cloud API
            //AnalyzeSentimentFromText(text);
            //AnalyzeEntitiesFromText(text);
            //AnalyzeSyntaxFromText(text);
            //AnalyzeEntitySentimentFromText(text);
            //ClassifyTextFromText(text);
            #endregion

            #region Google Place API
            //var lines = System.IO.File.ReadAllLines(@"D:\Diplomski Rad\config.ts");
            //string AppSecret = lines[0];

            //Client = new System.Net.Http.HttpClient();
            //Client.BaseAddress = new Uri("https://maps.googleapis.com/maps/api/place/");

            //var query = "zagreb";

            //var resp = Task.Run(async () => await Client.GetAsync(string.Format("textsearch/json?key={0}&query={1}", AppSecret, query))).ConfigureAwait(false).GetAwaiter().GetResult();
            //if (resp.IsSuccessStatusCode)
            //{
            //    var result = JObject.Parse(Task.Run(async () => await resp.Content.ReadAsStringAsync()).ConfigureAwait(false).GetAwaiter().GetResult());
            //    var placeID = result["results"][0]["place_id"];
            //    var details = Task.Run(async () => await Client.GetAsync(String.Format("details/json?key={0}&placeid={1}", AppSecret, placeID))).ConfigureAwait(false).GetAwaiter().GetResult();
            //    var content = JObject.Parse(Task.Run(async () => await details.Content.ReadAsStringAsync()).ConfigureAwait(false).GetAwaiter().GetResult());
            //var PhotoReference = result["results"][0]["photos"][0]["photo_reference"];
            //var MaxHeight = result["results"][0]["photos"][0]["height"];
            //var MaxWidth = result["results"][0]["photos"][0]["width"];
            //var url = String.Format("photo?photoreference={0}&sensor=false&maxheight={1}&maxwidth={2}&key={3}", PhotoReference, MaxHeight, MaxWidth, AppSecret);
            //var photoRequest = Task.Run(async () => await Client.GetAsync(url)).ConfigureAwait(false).GetAwaiter().GetResult();
            //var photo = Task.Run(async () => await photoRequest.Content.ReadAsStringAsync()).ConfigureAwait(false).GetAwaiter().GetResult();
            //}
            #endregion

            #region Wikipedia API
            //http://en.wikipedia.org/w/api.php?action=query&titles=Al-Farabi&prop=pageimages&format=json&pithumbsize=100
            //https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Stack%20Overflow
            //indexpageids=&format=jsonfm [try in ApiSandbox]

            //var wikiClient = new System.Net.Http.HttpClient();
            // var wikiResponse = Task.Run(async () => await wikiClient.GetStringAsync(string.Format("http://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=Zagreb&format=json"))).ConfigureAwait(false).GetAwaiter().GetResult();
            //var wikiResponseSummary = JObject.Parse(Task.Run(async () => await wikiClient.GetStringAsync(string.Format("http://en.wikipedia.org/w/api.php?format=json&indexpageids=&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Zagreb"))).ConfigureAwait(false).GetAwaiter().GetResult());
            //var responseQuery = wikiResponseSummary["query"];
            //var responsePageId = responseQuery["pageids"][0].ToString();
            //var summary = responseQuery["pages"][responsePageId]["extract"];
            //var wikiResponseImage = JObject.Parse(Task.Run(async () => await wikiClient.GetStringAsync(string.Format("http://en.wikipedia.org/w/api.php?action=query&indexpageids=&prop=pageimages&format=json&piprop=original&titles=Zagreb"))).ConfigureAwait(false).GetAwaiter().GetResult());
            //var responseQuery = wikiResponseImage["query"];
            //var responsePageId = responseQuery["pageids"][0].ToString();
            //var summary = responseQuery["pages"][responsePageId]["original"]["source"].ToString();

            //var wikiResponseSummary1 = JObject.Parse(Task.Run(async () => await wikiClient.GetStringAsync(string.Format("https://en.wikipedia.org/api/rest_v1/page/summary/Zagreb"))).ConfigureAwait(false).GetAwaiter().GetResult());
            //var summary = wikiResponseSummary1["extract"].ToString();


            #endregion

            #region Flights API
            //var lines = System.IO.File.ReadAllLines(@"D:\Diplomski Rad\config.ts");
            //string flightsApiKey = lines[3];

            //var flightClient = new System.Net.Http.HttpClient();
            //flightClient.BaseAddress = new Uri("https://api.sandbox.amadeus.com/v1.2/flights/affiliate-search");
            //var origin = "LON";
            //var destination = "NYC";

            //var resp = Task.Run(async () => await flightClient.GetAsync(string.Format("?apikey={0}&origin={1}&destination={2}&departure_date=2019-01-08&return_date=2019-01-11", flightsApiKey, origin, destination))).ConfigureAwait(false).GetAwaiter().GetResult();
            //if (resp.IsSuccessStatusCode)
            //{
            //    var result = JObject.Parse(Task.Run(async () => await resp.Content.ReadAsStringAsync()).ConfigureAwait(false).GetAwaiter().GetResult());
            //    JArray array = (JArray)result["results"];
            //    System.Console.WriteLine($"Ukupno rezultata {array.Count}");

            //    var results0 = array[0];
            //    //FlightDetails outbound = results0["outbound"].ToObject<FlightDetails>();
            //    var outbound = results0["outbound"];
            //    JArray outboundArray = (JArray)outbound["flights"];
            //    System.Console.WriteLine($"Outbound flights: {outboundArray.Count}");
            //    var inbound = results0["inbound"];
            //    JArray inboundArray = (JArray)outbound["flights"];
            //    System.Console.WriteLine($"Inbound flights: {inboundArray.Count}");

            //    var flight0 = new FlightViewModel()
            //    {
            //        From = origin,
            //        To = destination,
            //        Currency = results0["fare"]["currency"].ToString(),
            //        TotalPrice = (decimal)results0["fare"]["total_price"],
            //        OutboundDuration = results0["outbound"]["duration"].ToString(),
            //        InboundDuration = results0["inbound"]["duration"].ToString(),
            //        Link = results0["deep_link"].ToString(),
            //    };
            //}

            #endregion

            #region Hotels API
            //var lines = System.IO.File.ReadAllLines(@"D:\Diplomski Rad\config.ts");
            //string flightsApiKey = lines[3];

            //var flightClient = new System.Net.Http.HttpClient();
            //flightClient.BaseAddress = new Uri("https://api.sandbox.amadeus.com/v1.2/hotels/search-airport");

            //var location = "NYC";
            //var check_in = "2018-01-08";
            //var check_out = "2018-01-11";
            //var resp = Task.Run(async () => await flightClient.GetAsync(string.Format("https://api.sandbox.amadeus.com/v1.2/hotels/search-airport?apikey=PwjKNqfE7uyak3JV3ehwyDeoiBAFVuxy&location=BOS&check_in=2017-12-15&check_out=2017-12-16"))).ConfigureAwait(false).GetAwaiter().GetResult();
            //var resp = Task.Run(async () => await flightClient.GetAsync(string.Format("?apikey={0}&location={1}&check_in={2}&check_out={3}", flightsApiKey, location, check_in, check_out))).ConfigureAwait(false).GetAwaiter().GetResult();
            //if (resp.IsSuccessStatusCode)
            //{
            //    var result = JObject.Parse(Task.Run(async () => await resp.Content.ReadAsStringAsync()).ConfigureAwait(false).GetAwaiter().GetResult());
            //    JArray array = (JArray)result["results"];
            //    System.Console.WriteLine($"Ukupno rezultata hoteli {array.Count}");

            //    var results0 = array[0];
            //}

            #endregion


            System.Console.ReadLine();
        }

        private class ScriptedPatchCommandData
        {
            public object Key { get; set; }
            public object Patch { get; set; }
        }

        private class ScriptedPatchRequest
        {
            public string Script { get; set; }
            public Dictionary<string, object> Values { get; set; }
        }


        #region Cloud Natural Language API - Analyzing Sentiment
        //private static void AnalyzeSentimentFromText(string text)
        //{
        //    var client = LanguageServiceClient.Create();
        //    var response = client.AnalyzeSentiment(new Document()
        //    {
        //        Content = text,
        //        Type = Document.Types.Type.PlainText
        //    });
        //    WriteSentiment(response.DocumentSentiment, response.Sentences);
        //}

        //private static void WriteSentiment(Sentiment sentiment,
        //    RepeatedField<Sentence> sentences)
        //{
        //    System.Console.WriteLine("Overall document sentiment:");
        //    System.Console.WriteLine($"\tScore: {sentiment.Score}");
        //    System.Console.WriteLine($"\tMagnitude: {sentiment.Magnitude}");
        //    System.Console.WriteLine("Sentence level sentiment:");
        //    foreach (var sentence in sentences)
        //    {
        //        System.Console.WriteLine($"\t{sentence.Text.Content}: "
        //            + $"({sentence.Sentiment.Score})");
        //    }
        //}
        #endregion

        #region Cloud Natural Language API - Analyzing Entities
        //private static void AnalyzeEntitiesFromText(string text)
        //{
        //    var client = LanguageServiceClient.Create();
        //    var response = client.AnalyzeEntities(new Document()
        //    {
        //        Content = text,
        //        Type = Document.Types.Type.PlainText
        //    });
        //    WriteEntities(response.Entities);
        //}

        //private static void WriteEntities(IEnumerable<Entity> entities)
        //{
        //    System.Console.WriteLine("Entities:");
        //    foreach (var entity in entities)
        //    {
        //        System.Console.WriteLine($"\tName: {entity.Name}");
        //        System.Console.WriteLine($"\tType: {entity.Type}");
        //        System.Console.WriteLine($"\tSalience: {entity.Salience}");
        //        System.Console.WriteLine("\tMentions:");
        //        foreach (var mention in entity.Mentions)
        //            System.Console.WriteLine($"\t\t{mention.Text.BeginOffset}: {mention.Text.Content}");
        //        System.Console.WriteLine("\tMetadata:");
        //        foreach (var keyval in entity.Metadata)
        //        {
        //            System.Console.WriteLine($"\t\t{keyval.Key}: {keyval.Value}");
        //        }
        //    }
        //}
        #endregion

        #region Cloud Natural Language API - Analyzing Syntax
        //private static void AnalyzeSyntaxFromText(string text)
        //{
        //    var client = LanguageServiceClient.Create();
        //    var response = client.AnnotateText(new Document()
        //    {
        //        Content = text,
        //        Type = Document.Types.Type.PlainText
        //    },
        //    new Google.Cloud.Language.V1.AnnotateTextRequest.Types.Features() { ExtractSyntax = true });
        //    WriteSentences(response.Sentences, response.Tokens);
        //}

        //private static void WriteSentences(IEnumerable<Sentence> sentences, RepeatedField<Token> tokens)
        //{
        //    System.Console.WriteLine("Sentences:");
        //    foreach (var sentence in sentences)
        //    {
        //        System.Console.WriteLine($"\t{sentence.Text.BeginOffset}: {sentence.Text.Content}");
        //    }
        //    System.Console.WriteLine("Tokens:");
        //    foreach (var token in tokens)
        //    {
        //        System.Console.WriteLine($"\t{token.PartOfSpeech.Tag} "
        //            + $"{token.Text.Content}");
        //    }
        //}
        #endregion

        #region Cloud Natural Language API - Analyzing Entity Sentiment
        //private static void AnalyzeEntitySentimentFromText(string text)
        //{
        //    var client = LanguageServiceClient.Create();
        //    var response = client.AnalyzeEntitySentiment(new Document()
        //    {
        //        Content = text,
        //        Type = Document.Types.Type.PlainText
        //    });
        //    WriteEntitySentiment(response.Entities);
        //}

        //private static void WriteEntitySentiment(IEnumerable<Entity> entities)
        //{
        //    System.Console.WriteLine("Entity Sentiment:");
        //    foreach (var entity in entities)
        //    {
        //        System.Console.WriteLine($"\t{entity.Name} "
        //            + $"({(int)(entity.Salience * 100)}%)");
        //        System.Console.WriteLine($"\t\tScore: {entity.Sentiment.Score}");
        //        System.Console.WriteLine($"\t\tMagnitude { entity.Sentiment.Magnitude}");
        //    }
        //}
        #endregion

        #region Cloud Natural Language API - Classifying Content
        //private static void ClassifyTextFromText(string text)
        //{
        //    var client = LanguageServiceClient.Create();
        //    var response = client.ClassifyText(new Document()
        //    {
        //        Content = text,
        //        Type = Document.Types.Type.PlainText
        //    });
        //    WriteCategories(response.Categories);
        //}

        //private static void WriteCategories(IEnumerable<ClassificationCategory> categories)
        //{
        //    System.Console.WriteLine("Categories:");
        //    foreach (var category in categories)
        //    {
        //        System.Console.WriteLine($"\tCategory: {category.Name}");
        //        System.Console.WriteLine($"\t\tConfidence: {category.Confidence}");
        //    }
        //}
        #endregion
    }
}
