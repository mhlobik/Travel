import { IAction } from '../common/appDataStructures';
import * as facebookActions from '../constants/facebook';

export interface IFacebookReducerState {

}

const initialState: IFacebookReducerState = {
};

export default function facebookReducer(state: IFacebookReducerState = initialState, action: IAction = { type: '', payload: null }) {
    switch (action.type) {
        case facebookActions.FACEBOOK_LOGIN:
        return {
            ...state
        };
        default:
            return state;
    }
}