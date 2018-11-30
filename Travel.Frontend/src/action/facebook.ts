import * as facebookActions from './../constants/facebook';
import { IUserProfile, IUser } from '../common/facebookUtilities';
import fetcher from '../common/fetcher';

const facebookBaseUrl = 'api/facebook';

export function manageUserFacebookData(user: IUser, userProfile: IUserProfile) {
    console.log('manageUserFacebookData', user);
    return (dispatch, getState) => {
        return fetcher.handleRequestAction(dispatch, {
            requestUrl: `${facebookBaseUrl}/manage-user-facebook-data`,
            requestActionName: facebookActions.MANAGE_USER_FACEBOOK_DATA,
            jsonResponseExpected: false,
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
    console.log('manageUserProfileFacebookData', userProfile);
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