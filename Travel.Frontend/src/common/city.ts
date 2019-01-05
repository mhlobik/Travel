import { PreferencesCategories, CityTabEnum } from './enums';

export interface ICity {
    cityId: string;
    name: string;
    country: string;
    flights: Array<IFlight>;
    // Hotels
    pointsOfInterest: Array<IPointsOfInterest>;
    imageUrl: string;
    description: string;
}

export interface ICityRating {
    cityId: string;
    userId: string;
    liked: boolean;
}

export interface IFlight {
    airline: string;
    flightFare: IFare;
    deepLink: string;
    // public FlightDetails Inbound { get; set; }
    // public FlightDetails Outbound { get; set; }
    travelClass: string;
}

export interface IFare {
    currency: string;
    totalPrice: number;
}

export interface IPointsOfInterest {
    id: string;
    categories: Array<IPointOfInterestCategory>;
    description: string;
    name: string;
    url: string;
}

export interface IPointOfInterestsCityInfo {
    city: ICity;
    pointOfInterestName: string;
    pointOfInterestId: string;
}

export interface IPointOfInterestCategory {
    id: string;
    name: string;
    categoryType: PreferencesCategories;
}

export interface AvailableTab {
    name: string;
    type: CityTabEnum;
}

export const cityAvailableTabs: Array<AvailableTab> = [
    {
        name: 'Description',
        type: CityTabEnum.description
    },
    {
        name: 'Points Of Interest',
        type: CityTabEnum.pointsOfInterests
    },
    {
        name: 'Flights',
        type: CityTabEnum.flights
    },
    {
        name: 'Hotels',
        type: CityTabEnum.hotels
    },
    {
        name: 'Ratings',
        type: CityTabEnum.ratings
    }
];
