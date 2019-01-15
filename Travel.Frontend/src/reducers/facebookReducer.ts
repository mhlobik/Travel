import { IAction } from '../common/appDataStructures';
import * as facebookActions from '../constants/facebook';
import { IUser, IUserProfile } from '../common/facebookUtilities';

export interface IFacebookReducerState {
    userLoggedIn: boolean;
    isGettingUsers: boolean;
    userExists: boolean;
    user: IUser;
    allUsers: Array<IUser>;
    allUserProfiles: Array<IUserProfile>;
    userProfile: IUserProfile;
    isGettingUserProfile: boolean;
}

const initialState: IFacebookReducerState = {
    userLoggedIn: false,
    isGettingUsers: false,
    userExists: false,
    user: null,
    allUsers: null,
    userProfile: null,
    isGettingUserProfile: false,
    allUserProfiles: null
};

export default function facebookReducer(state: IFacebookReducerState = initialState, action: IAction = { type: '', payload: null }) {
    switch (action.type) {
        case `${facebookActions.MANAGE_USER_FACEBOOK_DATA}_REQUEST`:
            return {
                ...state,
                isCheckingUser: true
            };
        case `${facebookActions.MANAGE_USER_FACEBOOK_DATA}_RESPONSE`:
            return {
                ...state,
                isCheckingUser: false,
                user: action.payload
            };
        case `${facebookActions.MANAGE_USER_FACEBOOK_DATA}_ERROR`:
            return {
                ...state,
                isCheckingUser: false
            };
        case `${facebookActions.MANAGE_USER_PROFILE_FACEBOOK_DATA}_REQUEST`:
            return {
                ...state,
                isGettingUserProfile: true
            };
        case `${facebookActions.MANAGE_USER_PROFILE_FACEBOOK_DATA}_RESPONSE`:
            return {
                ...state,
                isGettingUserProfile: false,
                userProfile: action.payload
            };
        case `${facebookActions.MANAGE_USER_PROFILE_FACEBOOK_DATA}_ERROR`:
            return {
                ...state,
                isGettingUserProfile: false
            };
        case `${facebookActions.GET_USERS}_REQUEST`:
            return {
                ...state,
                isGettingUsers: true
            };
        case `${facebookActions.GET_USERS}_RESPONSE`:
            return {
                ...state,
                isGettingUsers: false,
                allUsers: action.payload
            };
        case `${facebookActions.GET_USERS}_ERROR`:
            return {
                ...state,
                isGettingUsers: false
            };
        case facebookActions.SET_USER_FLAGS:
            return {
                ...state,
                userExists: action.payload.userExists,
                userLoggedIn: action.payload.userLoggedIn,
                user: action.payload.user
            };
        default:
            return state;
    }
}