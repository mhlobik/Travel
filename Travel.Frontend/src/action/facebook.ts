import * as facebookActions from './../constants/facebook';
import { IUserProfile, IUser } from '../common/facebookUtilities';
import fetcher from '../common/fetcher';

const facebookBaseUrl = 'api/facebook';

export function manageFacebookData(userProfile: IUserProfile, user: IUser) {
    console.log('userProfile, user', userProfile, user);
    return (dispatch, getState) => {
        return fetcher.handleRequestAction(dispatch, {
            requestUrl: `${facebookBaseUrl}/manage-facebook-data`,
            requestActionName: facebookActions.MANAGE_FACEBOOK_DATA,
            jsonResponseExpected: true,
            requestInit: {
                method: 'POST',
                body: JSON.stringify(user)
            }
        });
    };
}