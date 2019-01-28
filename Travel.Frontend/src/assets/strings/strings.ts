import { ITooltipProps, DirectionalHint } from 'quick-react-ts';
import { PreferencesCategories } from '../../common/enums';

export const inputIsRequired = 'This field is required. Please enter valid value!';
export const inputNonWhitespace = 'You entered value as whitespace. Please enter valid value!';
export const emailNotInValidForm = 'Email must be in the correct form. Please enter valid value!';

export namespace UserPreferencesStrings {
    export const userPreferencesTitle = (name: string) => { return name + ', what excites you most about traveling?'; };
    export const userPreferencesSubtitle = 'It will help us find perfect travel for you!';
    export const userPreferencesMaxFlightPrice = 'Max Flight Price ($)';
    export const userPreferencesMaxFlightPriceTooltip = 'If you set max flight price, '
        + 'we will find travels that have flights in that price range.';
    export const userPReferencesMaxTravelPrice = 'Max travel price ($)';
    export const userPReferencesMaxTravelPriceTooltip = 'If you set max travel price, '
        + 'we will find travels that have flights and hotels in that price range.';

    export const userPreferenceMonth = 'Favorite month for traveling';
    export const userPreferenceMonthTooltip = 'If you set favorite month for traveling, '
    + 'we will find travels that have flights in that month.';
    export const userPreferenceDuration = 'Travel duration (days)';
    export const userPreferenceDurationTooltip = 'If you set travel duration, '
        + 'we will find travels that have return flights for that number of days.';

        export const userPreferencePartOfMonth = 'Favorite part of month for traveling';

    export const artsPreferenceTooltip: ITooltipProps = {
        content: 'This category will cover cities with art galleries, exibits, performing art venues and public art.',
        directionalHint: DirectionalHint.rightCenter
    };
    export const beachPreferenceTooltip: ITooltipProps = {
        content: 'This category will cover cities with beach.',
        directionalHint: DirectionalHint.rightCenter
    };
    export const entertainmentPreferenceTooltip: ITooltipProps = {
        content: 'This category will cover cities that include some of this entertaiment activities: arcade, bowling alley, casino,'
            + ' comedy club, go kart track, karaoke box, laser tag, mini golf, movie theater, pool hall, golf course, circus.',
        directionalHint: DirectionalHint.rightCenter
    };
    export const familyTravelPreferenceTooltip: ITooltipProps = {
        content: 'This category will cover cities that include some of this activities: '
            + 'aquarium, circus, water park, zoo, playground pool, dive spot.',
        directionalHint: DirectionalHint.rightCenter
    };
    export const gastroPreferenceTooltip: ITooltipProps = {
        content: 'This category will cover cities that have wineyard and difirenet kinds of restaurants.',
        directionalHint: DirectionalHint.rightCenter
    };
    export const historicalContentPreferenceTooltip: ITooltipProps = {
        content: 'This category will cover cities that include some of this activities: '
            + 'memorial site, mouseum, historic site, castle, palace, and spiritual center '
            + '(example: budhist temple, church, synagouge, ...)',
        directionalHint: DirectionalHint.rightCenter
    };
    export const mountainPreferenceTooltip: ITooltipProps = {
        content: 'This category will cover cities that have mountain and climbing activities.',
        directionalHint: DirectionalHint.rightCenter
    };
    export const outdoorsPreferenceTooltip: ITooltipProps = {
        content: 'This category will cover cities that include some of this activities: '
            + 'campground, cave, hill, hot spring, nature preserve, park, pedestrain plaza, '
            + 'waterfall, volcano, vineyard and national park.',
        directionalHint: DirectionalHint.rightCenter
    };
    export const recreationPreferenceTooltip: ITooltipProps = {
        content: 'This category will cover cities that include some of this activities: '
            + 'paintball field, bike trail, rafting, recreaton center, rock climbing spot and campground.',
        directionalHint: DirectionalHint.rightCenter
    };
    export const skiingPreferenceTooltip: ITooltipProps = {
        content: 'This category will cover cities that include skiing activities.',
        directionalHint: DirectionalHint.rightCenter
    };
}

export namespace CityChooserStrings {
    export const cityChooserTitle = (name: string) => { return name + ', choose 5 cities you like'; };
    export const cityChooserSubtitle = 'It will help us find perfect travel for you!';
}

export const getPreferencesCategoriesStrings = (category: number) => {
    switch (category) {
        case PreferencesCategories.Arts: return 'Arts & Entertainment';
        case PreferencesCategories.Beach: return 'Beach';
        case PreferencesCategories.Entertainment: return 'Entertainment';
        case PreferencesCategories.FamilyTravel: return 'FamilyTravel';
        case PreferencesCategories.Gastro: return 'Gastro';
        case PreferencesCategories.HistoricalContent: return 'HistoricalContent';
        case PreferencesCategories.Mountain: return 'Mountain';
        case PreferencesCategories.Outdoors: return 'Outdoors';
        case PreferencesCategories.Recreation: return 'Recreation';
        case PreferencesCategories.Skiing: return 'Skiing';

        case PreferencesCategories.SpiritualCenter: return 'Spiritual Center';
        case PreferencesCategories.MemorialSite: return 'Memorial Site';
        case PreferencesCategories.Museum: return 'Museum';
        case PreferencesCategories.HistoricalSite: return 'Historic Site';
        case PreferencesCategories.Castle: return 'Castle';
        case PreferencesCategories.Palace: return 'Palace';
        case PreferencesCategories.SkiArea: return 'Ski Area';

        case PreferencesCategories.RockClimbingSpot: return 'Rock Climbing Spot';

        case PreferencesCategories.Aquarium: return 'Aquarium';
        case PreferencesCategories.WaterPark: return 'Water Park';
        case PreferencesCategories.Zoo: return 'Zoo';
        case PreferencesCategories.Playground: return 'Playground';
        case PreferencesCategories.Pool: return 'Pool';
        case PreferencesCategories.DiveSpot: return 'Dive Spot';
        case PreferencesCategories.ThemePark: return 'Theme Park';

        case PreferencesCategories.PaintballField: return 'Paintball Field';
        case PreferencesCategories.BikeTrail: return 'Bike Trail';
        case PreferencesCategories.Rafting: return 'Rafting';
        case PreferencesCategories.RecreationCenter: return 'Recreation Center';

        case PreferencesCategories.Campground: return 'Campground';
        case PreferencesCategories.Cave: return 'Cave';
        case PreferencesCategories.Hill: return 'Hill';
        case PreferencesCategories.HotSpring: return 'Hot Spring';
        case PreferencesCategories.NAturePreserve: return 'Nature Preserve';
        case PreferencesCategories.Park: return 'Park';
        case PreferencesCategories.PedestrianPlaza: return 'Pedestrian Plaza';
        case PreferencesCategories.OtherGreatOutdoors: return 'Other Great Outdoors';
        case PreferencesCategories.Waterfall: return 'Waterfall';
        case PreferencesCategories.Volcan: return 'Volcano';
        case PreferencesCategories.Vineyard: return 'Vineyard';
        case PreferencesCategories.NationalPark: return 'National Park';

        case PreferencesCategories.Arcade: return 'Arcade';
        case PreferencesCategories.BowlingAlley: return 'Bowling Alley';
        case PreferencesCategories.Casino: return 'Casino';
        case PreferencesCategories.Circus: return 'Circus';
        case PreferencesCategories.ComedyClub: return 'Comedy Club';
        case PreferencesCategories.ConcertHall: return 'Concert Hall';
        case PreferencesCategories.DiscGolf: return 'Disc Golf';
        case PreferencesCategories.GoKartTrack: return 'Go Kart Track';
        case PreferencesCategories.KaraokeBox: return 'Karaoke Box';
        case PreferencesCategories.LaserTag: return 'Laser Tag';
        case PreferencesCategories.MiniGolf: return 'Mini Golf';
        case PreferencesCategories.MovieTheater: return 'Movie Theater';

        case PreferencesCategories.PoolHall: return 'Pool Hall';
        case PreferencesCategories.GolfCourse: return 'Golf Course';
        case PreferencesCategories.ArtGallery: return 'Art Gallery';
        case PreferencesCategories.Exhibit: return 'Exhibit';
        case PreferencesCategories.PerformingArtsVenue: return 'Performing Arts Venue';
        case PreferencesCategories.PublicArt: return 'Public Art';
        case PreferencesCategories.PublicArt: return 'Outdoor Sculpture';
        case PreferencesCategories.PublicArt: return 'Street Art';

        case PreferencesCategories.ApresSkiBar: return 'Apres Ski Bar';
        case PreferencesCategories.SkiChairlift: return 'SkiChairlift';
        case PreferencesCategories.SkiChalet: return 'SkiChalet';
        case PreferencesCategories.SkiLodge: return 'SkiLodge';
        case PreferencesCategories.SkiTrail: return 'SkiTrail';
    }
};

export const noFlights = 'We didn\'t find flights for selected dates and cities. Please try different origin city or different date range.';
export const noHotels = (name: string) => { return 'We didn\'t find hotels for city "' + name + '" .'; };
export const ratingCity = (name: string) => { return 'How much do you like "' + name + '" city?'; };
export const ratingRecommendation = (name: string) => { return 'How accurate the recommendation of city "' + name + '" is?'; };
export const ratingCityNotLoggedIn = 'You must be logged in to rate city and recommendation. Please log in.';