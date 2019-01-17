using System.Collections.Generic;
using Travel.Database.Enums;

namespace Travel.Database.Model
{
    public class TextAnalysis
    {
        public List<string> Categories { get; set; }
        public List<TextAnalysisEntity> Entities { get; set; }
        public List<TextAnalysisKeyword> KeyWords { get; set; }
    }

    public class TextAnalysisEntity
    {
        public string Type { get; set; }
        public string Text { get; set; }
        public double? Relevance { get; set; }
    }

    public class TextAnalysisKeyword
    {
        public string Text { get; set; }
        public double? Relevance { get; set; }
    }
}
