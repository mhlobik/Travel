import { ITreeviewItem } from 'quick-react-ts';
import { PreferencesCategories } from './enums';
import { getPreferencesCategoriesStrings } from '../assets/strings/strings';
import { ISelection } from '../components/city/flightDatePicker';

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
        checked: false
    },
    {
        id: PreferencesCategories.Beach.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Beach),
        checked: false
    },
    {
        id: PreferencesCategories.Entertainment.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Entertainment),
        checked: false
    },
    {
        id: PreferencesCategories.FamilyTravel.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.FamilyTravel),
        checked: false
    },
    {
        id: PreferencesCategories.Gastro.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Gastro),
        checked: false
    },
    {
        id: PreferencesCategories.HistoricalContent.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.HistoricalContent),
        checked: false
    },
    {
        id: PreferencesCategories.Mountain.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Mountain),
        checked: false
    },
    {
        id: PreferencesCategories.Outdoors.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Outdoors),
        checked: false
    },
    {
        id: PreferencesCategories.Recreation.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Recreation),
        checked: false
    },
    {
        id: PreferencesCategories.Skiing.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Skiing),
        checked: false
    },
    {
        id: PreferencesCategories.ArtGallery.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.ArtGallery),
        parentId: PreferencesCategories.Arts.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.Exhibit.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Exhibit),
        parentId: PreferencesCategories.Arts.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.PerformingArtsVenue.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.PerformingArtsVenue),
        parentId: PreferencesCategories.Arts.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.PublicArt.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.PublicArt),
        parentId: PreferencesCategories.Arts.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.Arcade.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Arcade),
        parentId: PreferencesCategories.Entertainment.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.BowlingAlley.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.BowlingAlley),
        parentId: PreferencesCategories.Entertainment.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.Casino.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Casino),
        parentId: PreferencesCategories.Entertainment.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.ComedyClub.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.ComedyClub),
        parentId: PreferencesCategories.Entertainment.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.ConcertHall.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.ConcertHall),
        parentId: PreferencesCategories.Entertainment.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.DiscGolf.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.DiscGolf),
        parentId: PreferencesCategories.Entertainment.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.GoKartTrack.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.GoKartTrack),
        parentId: PreferencesCategories.Entertainment.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.GolfCourse.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.GolfCourse),
        parentId: PreferencesCategories.Entertainment.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.KaraokeBox.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.KaraokeBox),
        parentId: PreferencesCategories.Entertainment.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.LaserTag.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.LaserTag),
        parentId: PreferencesCategories.Entertainment.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.MiniGolf.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.MiniGolf),
        parentId: PreferencesCategories.Entertainment.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.MovieTheater.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.MovieTheater),
        parentId: PreferencesCategories.Entertainment.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.PoolHall.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.PoolHall),
        parentId: PreferencesCategories.Entertainment.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.Aquarium.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Aquarium),
        parentId: PreferencesCategories.FamilyTravel.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.Circus.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Circus),
        parentId: PreferencesCategories.FamilyTravel.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.DiveSpot.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.DiveSpot),
        parentId: PreferencesCategories.FamilyTravel.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.Playground.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Playground),
        parentId: PreferencesCategories.FamilyTravel.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.Pool.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Pool),
        parentId: PreferencesCategories.FamilyTravel.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.ThemePark.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.ThemePark),
        parentId: PreferencesCategories.FamilyTravel.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.WaterPark.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.WaterPark),
        parentId: PreferencesCategories.FamilyTravel.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.Zoo.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Zoo),
        parentId: PreferencesCategories.FamilyTravel.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.Castle.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Castle),
        parentId: PreferencesCategories.HistoricalContent.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.HistoricalSite.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.HistoricalSite),
        parentId: PreferencesCategories.HistoricalContent.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.MemorialSite.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.MemorialSite),
        parentId: PreferencesCategories.HistoricalContent.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.Museum.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Museum),
        parentId: PreferencesCategories.HistoricalContent.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.Palace.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Palace),
        parentId: PreferencesCategories.HistoricalContent.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.SpiritualCenter.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.SpiritualCenter),
        parentId: PreferencesCategories.HistoricalContent.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.Campground.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Campground),
        parentId: PreferencesCategories.Outdoors.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.Cave.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Cave),
        parentId: PreferencesCategories.Outdoors.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.Hill.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Hill),
        parentId: PreferencesCategories.Outdoors.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.HotSpring.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.HotSpring),
        parentId: PreferencesCategories.Outdoors.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.NAturePreserve.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.NAturePreserve),
        parentId: PreferencesCategories.Outdoors.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.NationalPark.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.NationalPark),
        parentId: PreferencesCategories.Outdoors.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.Park.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Park),
        parentId: PreferencesCategories.Outdoors.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.Vineyard.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Vineyard),
        parentId: PreferencesCategories.Outdoors.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.Volcan.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Volcan),
        parentId: PreferencesCategories.Outdoors.toString(),
        checked: false
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
        checked: false
    },
    {
        id: PreferencesCategories.BikeTrail.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.BikeTrail),
        parentId: PreferencesCategories.Recreation.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.PaintballField.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.PaintballField),
        parentId: PreferencesCategories.Recreation.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.Rafting.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.Rafting),
        parentId: PreferencesCategories.Recreation.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.RecreationCenter.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.RecreationCenter),
        parentId: PreferencesCategories.Recreation.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.RockClimbingSpot.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.RockClimbingSpot),
        parentId: PreferencesCategories.Recreation.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.ApresSkiBar.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.ApresSkiBar),
        parentId: PreferencesCategories.Skiing.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.SkiArea.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.SkiArea),
        parentId: PreferencesCategories.Skiing.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.SkiChairlift.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.SkiChairlift),
        parentId: PreferencesCategories.Skiing.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.SkiChalet.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.SkiChalet),
        parentId: PreferencesCategories.Skiing.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.SkiLodge.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.SkiLodge),
        parentId: PreferencesCategories.Skiing.toString(),
        checked: false
    },
    {
        id: PreferencesCategories.SkiTrail.toString(),
        text: getPreferencesCategoriesStrings(PreferencesCategories.SkiTrail),
        parentId: PreferencesCategories.Skiing.toString(),
        checked: false
    }
];

export function checkSavedPreferences(savedPreferences: Array<number>) {
    const newPreferenceChoices = preferenceChoices.map((choice) => {
        choice.checked = savedPreferences.find((id) => { return id.toString() === choice.id; }) !== undefined ? true : false;
        return choice;
    });

    return newPreferenceChoices;
}

export const monthParts: Array<ISelection> = [
    {
        label: 'First half of month',
        value: '1'
    },
    {
        label: 'Second half of month',
        value: '15'
    }
];

export const months: Array<ISelection> = [
    {
        label: 'January',
        value: '1'
    },
    {
        label: 'February',
        value: '2'
    },
    {
        label: 'March',
        value: '3'
    },
    {
        label: 'April',
        value: '4'
    },
    {
        label: 'May',
        value: '5'
    },
    {
        label: 'June',
        value: '6'
    },
    {
        label: 'July',
        value: '7'
    },
    {
        label: 'August',
        value: '8'
    },
    {
        label: 'September',
        value: '9'
    },
    {
        label: 'October',
        value: '10'
    },
    {
        label: 'November',
        value: '11'
    },
    {
        label: 'December',
        value: '12'
    }
];