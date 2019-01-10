import { IAction } from '../common/appDataStructures';
import * as cityActions from '../constants/city';
import { ICarouselData } from '../components/mainContent/mainContent';
import { IFlightViewModel, ICityRating, IHotel, IAirport } from '../common/city';

export interface ICityReducerState {
    isGettingPointsOfInterestsInfo: boolean;
    pointsOfInterestsInfo: Array<ICarouselData>;
    flights: Array<IFlightViewModel>;
    isGettingFlights: boolean;
    cityRating: ICityRating;
    isGettingCityRating: boolean;
    hotels: Array<IHotel>;
    isGettingHotels: boolean;
    airports: Array<IAirport>;
}

const initialState: ICityReducerState = {
    isGettingPointsOfInterestsInfo: false,
    pointsOfInterestsInfo: null,
    flights: null,
    isGettingFlights: false,
    cityRating: null,
    isGettingCityRating: false,
    hotels: null,
    isGettingHotels: false,
    airports: null
};

export default function cityReducer(state: ICityReducerState = initialState, action: IAction = { type: '', payload: null }) {
    switch (action.type) {
        case `${cityActions.GET_IMAGE_URL}_REQUEST`:
            return {
                ...state,
                isGettingPointsOfInterestsInfo: true
            };
        case `${cityActions.GET_IMAGE_URL}_RESPONSE`:
            return {
                ...state,
                isGettingPointsOfInterestsInfo: false,
                pointsOfInterestsInfo: action.payload
            };
        case `${cityActions.GET_IMAGE_URL}_ERROR`:
            return {
                ...state,
                isGettingPointsOfInterestsInfo: false
            };
        case `${cityActions.GET_FLIGHTS}_REQUEST`:
            return {
                ...state,
                isGettingFlights: true
            };
        case `${cityActions.GET_FLIGHTS}_RESPONSE`:
            return {
                ...state,
                isGettingFlights: false,
                flights: action.payload
            };
        case `${cityActions.GET_FLIGHTS}_ERROR`:
            return {
                ...state,
                isGettingFlights: false
            };
        case `${cityActions.GET_CITY_RATING}_REQUEST`:
            return {
                ...state,
                isGettingCityRating: true
            };
        case `${cityActions.GET_CITY_RATING}_RESPONSE`:
            return {
                ...state,
                isGettingCityRating: false,
                cityRating: action.payload
            };
        case `${cityActions.GET_CITY_RATING}_ERROR`:
            return {
                ...state,
                isGettingCityRating: false
            };
        case `${cityActions.GET_HOTELS}_REQUEST`:
            return {
                ...state,
                isGettingHotels: true,
                hotels: null
            };
        case `${cityActions.GET_HOTELS}_RESPONSE`:
            return {
                ...state,
                isGettingHotels: false,
                hotels: action.payload
            };
        case `${cityActions.GET_HOTELS}_ERROR`:
            return {
                ...state,
                isGettingHotels: false
            };
        case `${cityActions.GET_AIRPORTS}_RESPONSE`:
            return {
                ...state,
                airports: action.payload
            };
        default:
            return state;
    }
}