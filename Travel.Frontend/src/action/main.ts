import { IUser } from '../common/facebookUtilities';
import fetcher from '../common/fetcher';
import * as mainActions from './../constants/main';
import { ICityRating } from '../common/city';
import * as recommendationActionCreators from '../action/recommendation';

const mainBaseUrl = 'api/main';
const cityBaseUrl = 'api/city';

export function getCitiesChooser() {
    return (dispatch, getState) => {
        return fetcher.handleRequestAction(dispatch, {
            requestUrl: `${cityBaseUrl}/get-city-chooser`,
            requestActionName: mainActions.GET_CITIES_CHOOSER,
            jsonResponseExpected: true,
            requestInit: {
                method: 'GET'
            }
        });
    };
}

export function saveUserPreferences(userPreferences: Array<string>, maxTravelPrice: number, maxFlightPrice: number, user: IUser) {
    return (dispatch, getState) => {
        return fetcher.handleRequestAction(dispatch, {
            requestUrl: `${mainBaseUrl}/save-user-preferences`,
            requestActionName: mainActions.SAVE_USER_PREFERENCES,
            jsonResponseExpected: false,
            requestInit: {
                method: 'POST',
                body: JSON.stringify({
                    preferences: userPreferences,
                    maxTravelPrice: maxTravelPrice,
                    maxFlightPrice: maxFlightPrice,
                    userId: user.userId
                })
            }
        }).then(() => {
            dispatch(recommendationActionCreators.getKnowledgeBased(user.userId));
        });
    };
}

export function continueClicked(clicked: boolean) {
    return {
        type: mainActions.CONTINUE_CLICKED,
        payload: clicked
    };
}

export function selectedCities(clicked: boolean, cities: Array<ICityRating>) {
    return (dispatch, getState) => {
        dispatch(continueClicked(clicked));

        return fetcher.handleRequestAction(dispatch, {
            requestUrl: `${cityBaseUrl}/save-selected-cities`,
            requestActionName: mainActions.SELECT_CITIES,
            jsonResponseExpected: false,
            requestInit: {
                method: 'POST',
                body: JSON.stringify(cities)
            }
        });
    };
}

export function goToPreferences() {
    return {
        type: mainActions.GO_TO_PREFERENCES,
        payload: true
    };
}