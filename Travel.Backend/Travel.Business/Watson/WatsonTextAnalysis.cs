using IBM.WatsonDeveloperCloud.NaturalLanguageUnderstanding.v1;
using IBM.WatsonDeveloperCloud.NaturalLanguageUnderstanding.v1.Model;
using IBM.WatsonDeveloperCloud.Util;
using System;
using System.Collections.Generic;
using Travel.Database.Model;

namespace Travel.Business.Watson
{
    public class WatsonTextAnalysis
    {
        public TextAnalysis GetTextAnalysis(string text)
        {
            string apiKey = System.IO.File.ReadAllText(@"D:\Diplomski Rad\IBM_Watson_API_key.txt");

            var url = "https://gateway-fra.watsonplatform.net/natural-language-understanding/api";

            TokenOptions iamAssistantTokenOptions = new TokenOptions()
            {
                IamApiKey = apiKey,
                ServiceUrl = url
            };

            NaturalLanguageUnderstandingService naturalLanguageUnderstandingService = new NaturalLanguageUnderstandingService(iamAssistantTokenOptions, "2018-03-16");

            Parameters parameters = new Parameters()
            {
                Text = text,
                Features = new Features()
                {
                    Categories = new CategoriesOptions { },
                    Concepts = new ConceptsOptions
                    {
                    },
                    Emotion = new EmotionOptions { },
                    Entities = new EntitiesOptions
                    {
                        Sentiment = true
                    },
                    Sentiment = new SentimentOptions
                    {
                    }
                }
            };


            try
            {
                var result = naturalLanguageUnderstandingService.Analyze(parameters);

                var concepts = new List<TextAnalysisConcepts>();
                foreach (var concept in result.Concepts)
                {
                    concepts.Add(new TextAnalysisConcepts()
                    {
                        DbpediaResource = concept.DbpediaResource,
                        Relevance = concept.Relevance,
                        Text = concept.Text
                    });
                }

                var entities = new List<TextAnalysisEntities>();
                foreach (var entity in result.Entities)
                {
                    entities.Add(new TextAnalysisEntities()
                    {
                        Type = entity.Type,
                        Relevance = entity.Relevance,
                        Text = entity.Text
                    });
                }

                //ako je u kategorijama koje me zanimaju idem dalje?
                foreach (var category in result.Categories)
                {
                    var c = category.Label;
                }

                var analysis = new TextAnalysis()
                {
                    Concepts = concepts,
                    Entities = entities,
                    Sentiment = new TextAnalysisSentiment()
                    {
                        Label = result.Sentiment.Document.Label,
                        Score = result.Sentiment.Document.Score
                    }
                };
                return analysis;
            }
            catch (Exception ex)
            {
                //
            }

            return null;
        }
    }
}
