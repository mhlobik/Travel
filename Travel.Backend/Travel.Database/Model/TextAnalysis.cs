using System.Collections.Generic;
using Travel.Database.Enums;

namespace Travel.Database.Model
{
    public class TextAnalysis
    {
        public TextAnalysisCategoriesEnum Category { get; set; }
        public List<TextAnalysisConcepts> Concepts { get; set; }
        public List<TextAnalysisEntities> Entities { get; set; }
        public TextAnalysisSentiment Sentiment { get; set; }
    }

    public class TextAnalysisConcepts
    {
        public double? Relevance { get; set; }
        public string Text { get; set; }
        public string DbpediaResource { get; set; }
    }

    public class TextAnalysisEntities
    {
        public string Type { get; set; }
        public string Text { get; set; }
        public double? Relevance { get; set; }
    }

    public class TextAnalysisSentiment
    {
        public string Label { get; set; }
        public double? Score { get; set; }
    }
}
