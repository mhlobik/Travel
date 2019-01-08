import * as cityActions from '../constants/city';
import fetcher from '../common/fetcher';
import { IPointOfInterestsCityInfo, IPointsOfInterest, ICity } from '../common/city';

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

export function saveCityRating(cityId: string, userId: string, rate: number) {
    return (dispatch, getState) => {
        return fetcher.handleRequestAction(dispatch, {
            requestUrl: `${cityBaseUrl}/save-city-rating`,
            requestActionName: cityActions.GET_IMAGE_URL,
            jsonResponseExpected: true,
            requestInit: {
                method: 'POST',
                body: JSON.stringify({
                    cityId: cityId,
                    userId: userId,
                    rating: rate
                })
            }
        });
    };
}

export function getCityFlights(departureDate: Date, returnDate: Date, city: ICity) {
    return (dispatch, getState) => {
        return fetcher.handleRequestAction(dispatch, {
            requestUrl: `${cityBaseUrl}/get-flights`,
            requestActionName: cityActions.GET_FLIGHTS,
            jsonResponseExpected: true,
            requestInit: {
                method: 'POST',
                body: JSON.stringify({
                    origin: 'Zagreb',
                    destination: city.name,
                    departureDate: departureDate,
                    returnDate: returnDate
                })
            }
        });
    };
}

export function getCityRating(cityId: string) {
    return (dispatch, getState) => {
        return fetcher.handleRequestAction(dispatch, {
            requestUrl: `${cityBaseUrl}/get-rating/${cityId}`,
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
