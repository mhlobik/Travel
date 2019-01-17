using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Travel.Database.Model;

namespace Travel.Business.Watson
{
    public class FacebookTextAnalysis
    {
        public async Task<List<FacebookEvent>> FacebookEventsTextAnalysis(List<FacebookEvent> facebookEvents)
        {
            var updatedFacebookEvents = new List<FacebookEvent>();
            var textAnalysisManager = new WatsonTextAnalysis();
            Console.WriteLine("FacebookEventsTextAnalysis started\n");
            List<FacebookEvent> list = getEnglishFacebookEvents();
            foreach (var element in list)
            {
                facebookEvents.Add(element);
            }

            foreach (var fbEvent in facebookEvents)
            {
                var eventNameTextAnalysis = new TextAnalysis();
                var eventDescriptionTextAnalysis = new TextAnalysis();

                if (fbEvent.EventNameAnalysis == null)
                {
                    eventNameTextAnalysis = await textAnalysisManager.GetTextAnalysis(fbEvent.EventName);
                }

                if (fbEvent.EventDescriptionAnalysis == null)
                {
                    eventDescriptionTextAnalysis = await textAnalysisManager.GetTextAnalysis(fbEvent.EventDescription);
                }

                var updatedFbEvent = new FacebookEvent()
                {
                    EventDescription = fbEvent.EventDescription,
                    EventDescriptionAnalysis = eventDescriptionTextAnalysis,
                    EventId = fbEvent.EventId,
                    EventName = fbEvent.EventName,
                    EventNameAnalysis = eventNameTextAnalysis,
                    EventPlaceCity = fbEvent.EventPlaceCity,
                    EventPlaceCountry = fbEvent.EventPlaceCountry,
                    EventRSVPStatus = fbEvent.EventRSVPStatus
                };

                updatedFacebookEvents.Add(updatedFbEvent);
            }
            Console.WriteLine("FacebookEventsTextAnalysis finished\n");
            return updatedFacebookEvents;
        }

        public async Task<List<FacebookGroup>> FacebookGroupsTextAnalysis(List<FacebookGroup> facebookGroups)
        {
            var updatedFacebookGroups = new List<FacebookGroup>();
            var textAnalysisManager = new WatsonTextAnalysis();
            Console.WriteLine("FacebookGroupsTextAnalysis started\n");

            foreach (var fbGroup in facebookGroups)
            {
                var groupNameTextAnalysis = new TextAnalysis();
                var groupDescriptionTextAnalysis = new TextAnalysis();

                if (fbGroup.GroupNameAnalysis == null)
                {
                    groupNameTextAnalysis = fbGroup.GroupName != null ? await textAnalysisManager.GetTextAnalysis(fbGroup.GroupName) : null;
                }

                if (fbGroup.GroupDescriptionAnalysis == null)
                {
                    groupDescriptionTextAnalysis = fbGroup.GroupDescription != null ? await textAnalysisManager.GetTextAnalysis(fbGroup.GroupDescription) : null;
                }

                var updatedFbGroup = new FacebookGroup()
                {
                    GroupDescription = fbGroup.GroupDescription,
                    GroupDescriptionAnalysis = groupDescriptionTextAnalysis,
                    GroupId = fbGroup.GroupId,
                    GroupName = fbGroup.GroupName,
                    GroupNameAnalysis = groupNameTextAnalysis,
                    GroupPurpose = fbGroup.GroupPurpose,
                    GroupVenueCity = fbGroup.GroupVenueCity
                };

                updatedFacebookGroups.Add(updatedFbGroup);
            }
            Console.WriteLine("FacebookGroupsTextAnalysis finished\n");
            return updatedFacebookGroups;
        }

        public async Task<List<FacebookLike>> FacebookLikesTextAnalysis(List<FacebookLike> facebookLikes)
        {
            var updatedFacebookLikes = new List<FacebookLike>();
            var textAnalysisManager = new WatsonTextAnalysis();
            Console.WriteLine("FacebookLikesTextAnalysis started\n");
            foreach (var fbLike in facebookLikes)
            {
                var fbLikeNameTextAnalysis = new TextAnalysis();

                if (fbLike.LikedPageNameAnalysis == null)
                {
                    fbLikeNameTextAnalysis = fbLike.LikedPageName != null ? await textAnalysisManager.GetTextAnalysis(fbLike.LikedPageName) : null;
                }

                var updatedFbEvent = new FacebookLike()
                {
                    LikedPageId = fbLike.LikedPageId,
                    LikedPageName = fbLike.LikedPageName,
                    LikedPageNameAnalysis = fbLike.LikedPageNameAnalysis
                };

                updatedFacebookLikes.Add(updatedFbEvent);
            }
            Console.WriteLine("FacebookLikesTextAnalysis finished\n");
            return updatedFacebookLikes;
        }

        private List<FacebookEvent> getEnglishFacebookEvents()
        {
            var list = new List<FacebookEvent>()
            {
                new FacebookEvent()
                {
                    EventDescription = "A tour to enjoy Dubrovnik's top summer romantic activity, kayaking. You will explore beautiful caves and beaches, before paddling ashore for a glass of wine and picnic supper.",
                    EventDescriptionAnalysis = null,
                    EventId = "273682383500714_kayaking",
                    EventName = "Durovnik: Sunset Kayaking Tour",
                    EventNameAnalysis = null,
                    EventPlaceCity = "Dubrovnik",
                    EventPlaceCountry = "Croatia",
                    EventRSVPStatus = "unsure"
                },
                new FacebookEvent()
                {
                     EventDescription = "The Year of the Dog is here in 2018 and, as usual, Chinese New Year in London will be one of the most exciting events in February, full of colour, noise and a whole lot of dragons. Chinatown will be bulging with decorations and dancers to mark the start of the Chinese New Year (which begins on Friday February 16 2018). "
                                        + "Here's our round-up of parties and places to welcome in the Chinese New Year, plus tips on watching the parade too. For more insider advice, be sure to read-up on the best of Chinese London as well. "
                                        + "Remember, if you’re hoping for a meal at one of the best restaurants in Chinatown during the New Year celebrations, you'll need to book ahead, as the area gets incredibly busy.",
                     EventDescriptionAnalysis = null,
                     EventId = "1411911145609690_newYear",
                     EventName = "Chinese New Year in London",
                     EventNameAnalysis = null,
                     EventPlaceCity = "London",
                     EventPlaceCountry = "United Kingdom",
                     EventRSVPStatus = "unsure"
                },
                new FacebookEvent()
                {
                     EventDescription= "Gutsy enough to splash about in cold water this winter? Take on WaterAid’s challenge and plunge into the Parliament Hill Lido to help raise money to bring clean water to some of the world’s poorest countries. After the chilly swim, participants will be able to warm up in the jacuzzi and sauna.",
                     EventDescriptionAnalysis = null,
                     EventId = "1245159978956376_winterDip",
                     EventName = "Winter Dip",
                     EventNameAnalysis = null,
                     EventPlaceCity = "London",
                     EventPlaceCountry = "United Kingdom",
                     EventRSVPStatus = "unsure"
                },
                new FacebookEvent()
                {
                     EventDescription = "This is Ohrid's most celebrated festival and one of the biggest cultural events in Macedonia. It hits town in late July and features classical and opera concerts, theatre and dance staged at venues all over the city, including the Classical Amphitheatre. Buy tickets from the box office kiosk on Kej Maršal Tito, next to the Jazz & Blues cafe-bar.",
                     EventDescriptionAnalysis = null,
                     EventId = "361639614616833_ogrid",
                     EventName = "Ohrid Summer Festival",
                     EventNameAnalysis = null,
                     EventPlaceCity = "Ohrid",
                     EventPlaceCountry = "Macedonia",
                     EventRSVPStatus = "unsure"
                }
            };

            return list;
        }
    }
}
