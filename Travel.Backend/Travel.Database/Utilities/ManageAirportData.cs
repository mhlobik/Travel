using Raven.Client.Documents;
using Raven.Client.Documents.Session;
using System.Collections.Generic;
using System.Linq;
using Travel.Database.Model;

namespace Travel.Database.Utilities
{
    public class ManageAirportData
    {
        public void StoreAirport(Airport airport)
        {
            IDocumentStore store;
            using (store = DatabaseConnection.DocumentStoreInitialization())
            {
                using (IDocumentSession session = store.OpenSession())
                {
                    var existingAirport = session.Query<Airport>().Any(x => x.IATA == airport.IATA);
                    if (!existingAirport)
                    {
                        session.Store(airport);
                        session.SaveChanges();
                    }
                }
            }
        }
    }
}
