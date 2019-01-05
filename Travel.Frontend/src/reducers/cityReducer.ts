import { IAction } from '../common/appDataStructures';
import * as cityActions from '../constants/city';
import { ICarouselData } from '../components/mainContent/mainContent';

export interface ICityReducerState {
    isGettingPointsOfInterestsInfo: boolean;
    pointsOfInterestsInfo: Array<ICarouselData>;
}

const initialState: ICityReducerState = {
    isGettingPointsOfInterestsInfo: false,
    pointsOfInterestsInfo: null
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
        default:
            return state;
    }
}