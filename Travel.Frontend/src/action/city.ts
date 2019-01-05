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