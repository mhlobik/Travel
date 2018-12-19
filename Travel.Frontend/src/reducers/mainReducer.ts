import { IAction } from '../common/appDataStructures';
import * as mainActions from '../constants/main';
import { ICity } from '../common/city';

export interface IMainReducerState {
    isSavingPreferences: boolean;
    continueClicked: boolean;
    isGettingCities: boolean;
    citiesChooser: Array<ICity>;
    isSavingSelectedCities: boolean;
}

const initialState: IMainReducerState = {
    isSavingPreferences: false,
    continueClicked: false,
    isGettingCities: false,
    citiesChooser: [],
    isSavingSelectedCities: false
};

export default function facebookReducer(state: IMainReducerState = initialState, action: IAction = { type: '', payload: null }) {
    switch (action.type) {
        case `${mainActions.SAVE_USER_PREFERENCES}_REQUEST`:
            return {
                ...state,
                isSavingPreferences: true
            };
        case `${mainActions.SAVE_USER_PREFERENCES}_RESPONSE`:
            return {
                ...state,
                isSavingPreferences: false
            };
        case `${mainActions.SAVE_USER_PREFERENCES}_ERROR`:
            return {
                ...state,
                isSavingPreferences: false
            };
        case mainActions.CONTINUE_CLICKED:
            return {
                ...state,
                continueClicked: action.payload
            };
        case `${mainActions.GET_CITIES_CHOOSER}_REQUEST`:
            return {
                ...state,
                isGettingCities: true
            };
        case `${mainActions.GET_CITIES_CHOOSER}_RESPONSE`:
            return {
                ...state,
                isGettingCities: false,
                citiesChooser: action.payload
            };
        case `${mainActions.GET_CITIES_CHOOSER}_ERROR`:
            return {
                ...state,
                isGettingCities: false
            };
        case `${mainActions.SELECT_CITIES}_REQUEST`:
            return {
                ...state,
                isSavingSelectedCities: true
            };
        case `${mainActions.SELECT_CITIES}_RESPONSE`:
            return {
                ...state,
                isSavingSelectedCities: false
            };
        case `${mainActions.SELECT_CITIES}_ERROR`:
            return {
                ...state,
                isSavingSelectedCities: false
            };
        default:
            return state;
    }
}