import { ITreeviewItem } from 'quick-react-ts';
import { PreferencesCategories } from './enums';
import { getPreferencesCategoriesStrings } from '../assets/strings/strings';

export interface IValidation {
    message: string;
    isValidated: boolean;
}

export interface IAction {
    type: string;
    payload?: any;
}

export const defaultAction = {
    type: '',
    payload: null
};

export interface IActivationResult {
    isActivated: boolean;
    message: string;
}

export const preferenceChoices: Array<ITreeviewItem> = [
    {
        id: PreferencesCategories.Arts.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Arts),
        checked: true
    },
    {
        id: PreferencesCategories.Beach.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Beach),
        checked: true
    },
    {
        id: PreferencesCategories.Entertainment.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Entertainment),
        checked: true
    },
    {
        id: PreferencesCategories.FamilyTravel.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.FamilyTravel),
        checked: true
    },
    {
        id: PreferencesCategories.Gastro.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Gastro),
        checked: true
    },
    {
        id: PreferencesCategories.HistoricalContent.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.HistoricalContent),
        checked: true
    },
    {
        id: PreferencesCategories.Mountain.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Mountain),
        checked: true
    },
    {
        id: PreferencesCategories.Outdoors.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Outdoors),
        checked: true
    },
    {
        id: PreferencesCategories.Recreation.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Recreation),
        checked: true
    },
    {
        id: PreferencesCategories.Skiing.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Skiing),
        checked: true
    },
    {
        id: PreferencesCategories.ArtGallery.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.ArtGallery),
        parentId: PreferencesCategories.Arts.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.Exhibit.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Exhibit),
        parentId: PreferencesCategories.Arts.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.PerformingArtsVenue.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.PerformingArtsVenue),
        parentId: PreferencesCategories.Arts.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.PublicArt.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.PublicArt),
        parentId: PreferencesCategories.Arts.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.Arcade.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Arcade),
        parentId: PreferencesCategories.Entertainment.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.BowlingAlley.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.BowlingAlley),
        parentId: PreferencesCategories.Entertainment.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.Casino.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Casino),
        parentId: PreferencesCategories.Entertainment.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.ComedyClub.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.ComedyClub),
        parentId: PreferencesCategories.Entertainment.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.ConcertHall.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.ConcertHall),
        parentId: PreferencesCategories.Entertainment.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.DiscGolf.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.DiscGolf),
        parentId: PreferencesCategories.Entertainment.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.GoKartTrack.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.GoKartTrack),
        parentId: PreferencesCategories.Entertainment.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.GolfCourse.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.GolfCourse),
        parentId: PreferencesCategories.Entertainment.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.KaraokeBox.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.KaraokeBox),
        parentId: PreferencesCategories.Entertainment.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.LaserTag.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.LaserTag),
        parentId: PreferencesCategories.Entertainment.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.MiniGolf.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.MiniGolf),
        parentId: PreferencesCategories.Entertainment.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.MovieTheater.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.MovieTheater),
        parentId: PreferencesCategories.Entertainment.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.PoolHall.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.PoolHall),
        parentId: PreferencesCategories.Entertainment.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.Aquarium.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Aquarium),
        parentId: PreferencesCategories.FamilyTravel.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.Circus.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Circus),
        parentId: PreferencesCategories.FamilyTravel.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.DiveSpot.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.DiveSpot),
        parentId: PreferencesCategories.FamilyTravel.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.Playground.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Playground),
        parentId: PreferencesCategories.FamilyTravel.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.Pool.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Pool),
        parentId: PreferencesCategories.FamilyTravel.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.ThemePark.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.ThemePark),
        parentId: PreferencesCategories.FamilyTravel.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.WaterPark.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.WaterPark),
        parentId: PreferencesCategories.FamilyTravel.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.Zoo.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Zoo),
        parentId: PreferencesCategories.FamilyTravel.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.Castle.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Castle),
        parentId: PreferencesCategories.HistoricalContent.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.HistoricalSite.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.HistoricalSite),
        parentId: PreferencesCategories.HistoricalContent.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.MemorialSite.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.MemorialSite),
        parentId: PreferencesCategories.HistoricalContent.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.Museum.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Museum),
        parentId: PreferencesCategories.HistoricalContent.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.Palace.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Palace),
        parentId: PreferencesCategories.HistoricalContent.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.SpiritualCenter.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.SpiritualCenter),
        parentId: PreferencesCategories.HistoricalContent.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.Campground.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Campground),
        parentId: PreferencesCategories.Outdoors.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.Cave.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Cave),
        parentId: PreferencesCategories.Outdoors.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.Hill.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Hill),
        parentId: PreferencesCategories.Outdoors.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.HotSpring.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.HotSpring),
        parentId: PreferencesCategories.Outdoors.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.NAturePreserve.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.NAturePreserve),
        parentId: PreferencesCategories.Outdoors.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.NationalPark.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.NationalPark),
        parentId: PreferencesCategories.Outdoors.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.Park.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Park),
        parentId: PreferencesCategories.Outdoors.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.Vineyard.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Vineyard),
        parentId: PreferencesCategories.Outdoors.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.Volcan.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Volcan),
        parentId: PreferencesCategories.Outdoors.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.Waterfall.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Waterfall),
        parentId: PreferencesCategories.toString()
    },
    {
        id: PreferencesCategories.PedestrianPlaza.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.PedestrianPlaza),
        parentId: PreferencesCategories.Outdoors.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.BikeTrail.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.BikeTrail),
        parentId: PreferencesCategories.Recreation.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.PaintballField.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.PaintballField),
        parentId: PreferencesCategories.Recreation.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.Rafting.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Rafting),
        parentId: PreferencesCategories.Recreation.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.RecreationCenter.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.RecreationCenter),
        parentId: PreferencesCategories.Recreation.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.RockClimbingSpot.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.RockClimbingSpot),
        parentId: PreferencesCategories.Recreation.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.ApresSkiBar.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.ApresSkiBar),
        parentId: PreferencesCategories.Skiing.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.SkiArea.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.SkiArea),
        parentId: PreferencesCategories.Skiing.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.SkiChairlift.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.SkiChairlift),
        parentId: PreferencesCategories.Skiing.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.SkiChalet.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.SkiChalet),
        parentId: PreferencesCategories.Skiing.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.SkiLodge.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.SkiLodge),
        parentId: PreferencesCategories.Skiing.toString(),
        checked: true
    },
    {
        id: PreferencesCategories.SkiTrail.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.SkiTrail),
        parentId: PreferencesCategories.Skiing.toString(),
        checked: true
    }
];
