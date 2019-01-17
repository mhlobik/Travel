using IBM.WatsonDeveloperCloud.NaturalLanguageUnderstanding.v1;
using IBM.WatsonDeveloperCloud.NaturalLanguageUnderstanding.v1.Model;
using IBM.WatsonDeveloperCloud.Util;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Travel.Database.Model;

namespace Travel.Business.Watson
{
    public class WatsonTextAnalysis
    {
        public async Task<TextAnalysis> GetTextAnalysis(string text)
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
                    Entities = new EntitiesOptions
                    {
                    },
                    Keywords = new KeywordsOptions()
                    {
                    }
                }
            };


            try
            {
                var result = naturalLanguageUnderstandingService.Analyze(parameters);

                var entities = new List<TextAnalysisEntity>();
                foreach (var entity in result.Entities)
                {
                    entities.Add(new TextAnalysisEntity()
                    {
                        Type = entity.Type,
                        Relevance = entity.Relevance,
                        Text = entity.Text
                    });
                }

                var categories = new List<string>();
                foreach (var category in result.Categories)
                {
                    categories.Add(category.Label);
                }

                var keywords = new List<TextAnalysisKeyword>();
                foreach (var word in result.Keywords)
                {
                    keywords.Add(new TextAnalysisKeyword() {
                        Text = word.Text,
                        Relevance = word.Relevance
                    });
                }

                var analysis = new TextAnalysis()
                {
                    Entities = entities,
                    Categories = categories,
                    KeyWords = keywords
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
