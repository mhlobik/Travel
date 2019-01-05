using Google.Cloud.Language.V1;
using Google.Protobuf.Collections;
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
            ////string text = "Always dreamed of a movielike summer exper Kako postati državni uhljeb? Seminar + Neradionica";

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
            //Client = new System.Net.Http.HttpClient();
            //Client.BaseAddress = new Uri("https://maps.googleapis.com/maps/api/place/");

            // var query = "La Poterne Caen";
            // var resp = Task.Run(async () => await Client.GetAsync(string.Format("textsearch/json?key={0}&query={1}", AppSecret, query))).ConfigureAwait(false).GetAwaiter().GetResult();
            // if (resp.IsSuccessStatusCode)
            // {
            //     var result = JObject.Parse(Task.Run(async () => await resp.Content.ReadAsStringAsync()).ConfigureAwait(false).GetAwaiter().GetResult());
            //     var placeID = result["results"][0]["place_id"];
            //     var details = Task.Run(async () => await Client.GetAsync(String.Format("details/json?key={0}&placeid={1}", AppSecret, placeID))).ConfigureAwait(false).GetAwaiter().GetResult();
            //     var content = JObject.Parse(Task.Run(async () => await details.Content.ReadAsStringAsync()).ConfigureAwait(false).GetAwaiter().GetResult());
            //     var PhotoReference = result["results"][0]["photos"][0]["photo_reference"];
            //     var MaxHeight = result["results"][0]["photos"][0]["height"];
            //     var MaxWidth = result["results"][0]["photos"][0]["width"];
            //     var url = String.Format("photo?photoreference={0}&sensor=false&maxheight={1}&maxwidth={2}&key={3}", PhotoReference, MaxHeight, MaxWidth, AppSecret);
            //     var photoRequest = Task.Run(async () => await Client.GetAsync(url)).ConfigureAwait(false).GetAwaiter().GetResult();
            //     var photo = Task.Run(async () => await photoRequest.Content.ReadAsStringAsync()).ConfigureAwait(false).GetAwaiter().GetResult();

            //     // /photo?maxwidth=400&photoreference=CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU&key=YOUR_API_KEY
            // }
            //                URL = "https://en.wikipedia.org/w/api.php"
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
