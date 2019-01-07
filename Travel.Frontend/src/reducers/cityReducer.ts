import { IAction } from '../common/appDataStructures';
import * as cityActions from '../constants/city';
import { ICarouselData } from '../components/mainContent/mainContent';
import { IFlightViewModel } from '../common/city';

export interface ICityReducerState {
    isGettingPointsOfInterestsInfo: boolean;
    pointsOfInterestsInfo: Array<ICarouselData>;
    flights: Array<IFlightViewModel>;
    isGettingFlights: boolean;
}

const initialState: ICityReducerState = {
    isGettingPointsOfInterestsInfo: false,
    pointsOfInterestsInfo: null,
    flights: null,
    isGettingFlights: false
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
        default:
            return state;
    }
}