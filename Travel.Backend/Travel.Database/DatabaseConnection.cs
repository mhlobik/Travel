using Raven.Client.Documents;
using Raven.Client.Documents.Session;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Travel.Database.Model;

namespace Travel.Database
{
    public class DatabaseConnection
    {
        public static IDocumentStore DocumentStoreInitialization()
        {
            return new DocumentStore
            {
                Urls = new[] { "http://127.0.0.1:8080" },
                Database = "Travel",
                Conventions = { }
            }.Initialize();
        }

        public void TestCon(User user)
        {
            IDocumentStore store;
            using (store = DocumentStoreInitialization())
            {
                using (IDocumentSession session = store.OpenSession())  // Open a session for a default 'Database'
                {
                    session.Store(user);

                    // send all pending operations to server, in this case only `Put` operation
                    session.SaveChanges();
                }
            }
        }
    }
}
