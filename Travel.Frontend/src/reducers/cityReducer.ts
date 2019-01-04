import { IAction } from '../common/appDataStructures';
import * as cityActions from '../constants/city';

export interface ICityReducerState {
    isGettingImageUrl: boolean;
    imageUrl: string;
}

const initialState: ICityReducerState = {
    isGettingImageUrl: false,
    imageUrl: null
};

export default function cityReducer(state: ICityReducerState = initialState, action: IAction = { type: '', payload: null }) {
    switch (action.type) {
        case `${cityActions.GET_IMAGE_URL}_REQUEST`:
            return {
                ...state,
                isGettingImageUrl: true
            };
        case `${cityActions.GET_IMAGE_URL}_RESPONSE`:
            return {
                ...state,
                isGettingImageUrl: false,
                imageUrl: action.payload
            };
        case `${cityActions.GET_IMAGE_URL}_ERROR`:
            return {
                ...state,
                isGettingImageUrl: false
            };
        default:
            return state;
    }
}