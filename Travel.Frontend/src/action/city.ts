import * as cityActions from '../constants/city';
import fetcher from '../common/fetcher';
import { IPointOfInterestsCityInfo, IPointsOfInterest, ICity } from '../common/city';
import { IUser } from '../common/facebookUtilities';

const cityBaseUrl = 'api/city/';

export function getImageUrls(city: ICity) {
    return (dispatch, getState) => {
        return fetcher.handleRequestAction(dispatch, {
            requestUrl: `${cityBaseUrl}/get-image-url`,
            requestActionName: cityActions.GET_IMAGE_URL,
            jsonResponseExpected: true,
            requestInit: {
                method: 'POST',
                body: JSON.stringify(city)
            }
        });
    };
}

export function saveCityRating(cityId: string, user: IUser, rate: number) {
    return (dispatch, getState) => {
        return fetcher.handleRequestAction(dispatch, {
            requestUrl: `${cityBaseUrl}/save-city-rating`,
            requestActionName: cityActions.SAVE_CITY_RATING,
            jsonResponseExpected: true,
            requestInit: {
                method: 'POST',
                body: JSON.stringify({
                    cityId: cityId,
                    userId: user.userId,
                    rating: rate
                })
            }
        });
    };
}

export function getCityFlights(departureDate: Date, returnDate: Date, originSelected: string, destinationSelected: string) {
    return (dispatch, getState) => {
        return fetcher.handleRequestAction(dispatch, {
            requestUrl: `${cityBaseUrl}/get-flights`,
            requestActionName: cityActions.GET_FLIGHTS,
            jsonResponseExpected: true,
            requestInit: {
                method: 'POST',
                body: JSON.stringify({
                    origin: originSelected,
                    destination: destinationSelected,
                    departureDate: departureDate,
                    returnDate: returnDate
                })
            }
        });
    };
}

export function getCityRating(cityId: string, userId: string) {
    return (dispatch, getState) => {
        return fetcher.handleRequestAction(dispatch, {
            requestUrl: `${cityBaseUrl}/get-rating/${cityId}/${userId}`,
            requestActionName: cityActions.GET_CITY_RATING,
            jsonResponseExpected: true,
            requestInit: {
                method: 'GET'
            }
        });
    };
}

export function getCityHotels(city: ICity) {
    return (dispatch, getState) => {
        return fetcher.handleRequestAction(dispatch, {
            requestUrl: `${cityBaseUrl}/get-hotels`,
            requestActionName: cityActions.GET_HOTELS,
            jsonResponseExpected: true,
            requestInit: {
                method: 'POST',
                body: JSON.stringify(city)
            }
        });
    };
}

export function getAllAirports() {
    return (dispatch, getState) => {
        return fetcher.handleRequestAction(dispatch, {
            requestUrl: `${cityBaseUrl}/get-airports`,
            requestActionName: cityActions.GET_AIRPORTS,
            jsonResponseExpected: true,
            requestInit: {
                method: 'GET'
            }
        });
    };
}