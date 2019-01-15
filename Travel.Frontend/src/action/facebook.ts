import * as facebookActions from './../constants/facebook';
import { IUserProfile, IUser } from '../common/facebookUtilities';
import fetcher from '../common/fetcher';
import * as mainActionCreators from '../action/main';
import * as recommendationActionCreators from '../action/recommendation';

const facebookBaseUrl = 'api/facebook';

export function manageUserFacebookData(user: IUser, userProfile: IUserProfile, userExist: any) {
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
            dispatch(manageUserProfileFacebookData(userProfile, userExist));
        });
    };
}

export function manageUserProfileFacebookData(userProfile: IUserProfile, userExist: any) {
    return (dispatch, getState) => {
        return fetcher.handleRequestAction(dispatch, {
            requestUrl: `${facebookBaseUrl}/manage-user-profile-facebook-data`,
            requestActionName: facebookActions.MANAGE_USER_PROFILE_FACEBOOK_DATA,
            jsonResponseExpected: true,
            requestInit: {
                method: 'POST',
                body: JSON.stringify(userProfile)
            }
        }).then(() => {
            console.log('manageUserProfileFacebookData', userExist);
            if (userExist === undefined) {
                dispatch(mainActionCreators.goToPreferences(true));
            }

            if (userExist !== undefined) {
                dispatch(recommendationActionCreators.getKnowledgeBased(userProfile.userId));
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

export function getUserProfile(userId: string) {
    return (dispatch, getState) => {
        return fetcher.handleRequestAction(dispatch, {
            requestUrl: `${facebookBaseUrl}/get-user-profile/${userId}`,
            requestActionName: facebookActions.MANAGE_USER_PROFILE_FACEBOOK_DATA,
            jsonResponseExpected: true,
            requestInit: {
                method: 'GET'
            }
        });
    };
}