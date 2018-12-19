import * as facebookActions from './../constants/facebook';
import { IUserProfile, IUser } from '../common/facebookUtilities';
import fetcher from '../common/fetcher';

const facebookBaseUrl = 'api/facebook';

export function manageUserFacebookData(user: IUser, userProfile: IUserProfile) {
    return (dispatch, getState) => {
        return fetcher.handleRequestAction(dispatch, {
            requestUrl: `${facebookBaseUrl}/manage-user-facebook-data`,
            requestActionName: facebookActions.MANAGE_USER_FACEBOOK_DATA,
            jsonResponseExpected: true,
            requestInit: {
                method: 'POST',
                body: JSON.stringify(user)
            }
        }).then(() => {
            dispatch(manageUserProfileFacebookData(userProfile));
        });
    };
}

export function manageUserProfileFacebookData(userProfile: IUserProfile) {
    return (dispatch, getState) => {
        return fetcher.handleRequestAction(dispatch, {
            requestUrl: `${facebookBaseUrl}/manage-user-profile-facebook-data`,
            requestActionName: facebookActions.MANAGE_USER_PROFILE_FACEBOOK_DATA,
            jsonResponseExpected: false,
            requestInit: {
                method: 'POST',
                body: JSON.stringify(userProfile)
            }
        });
    };
}

export function getUsers() {
    return (dispatch, getState) => {
        return fetcher.handleRequestAction(dispatch, {
            requestUrl: `${facebookBaseUrl}/get-users`,
            requestActionName: facebookActions.GET_USERS,
            jsonResponseExpected: true,
            requestInit: {
                method: 'GET'
            }
        });
    };
}

export function markIsUserExists(exists: boolean, loggedIn: boolean, user: IUser) {
    return {
        type: facebookActions.SET_USER_FLAGS,
        payload: { userExists: exists, userLoggedIn: loggedIn, user: user }
    };
}