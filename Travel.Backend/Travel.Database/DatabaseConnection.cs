using Raven.Client.Documents;
using Raven.Client.Documents.Session;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Travel.Database
{
    public class DatabaseConnection
    {
        public IDocumentStore DocumentStoreInitialization()
        {
            return new DocumentStore
            {
                Urls = new[] { "http://127.0.0.1:8080" },
                Database = "test",
                Conventions = { }
            }.Initialize();
        }

        public void TestCon()
        {
            IDocumentStore store;
            using (store = DocumentStoreInitialization())
            {
                using (IDocumentSession session = store.OpenSession())  // Open a session for a default 'Database'
                {
                    var category = session.Query<Category>().ToList();
                }
            }
        }
    }

    public class Category
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
