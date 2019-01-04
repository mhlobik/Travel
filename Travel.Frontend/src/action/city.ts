import * as cityActions from '../constants/city';
import fetcher from '../common/fetcher';

const cityBaseUrl = 'api/city/';

export function getImageUrl(name: string) {
    return (dispatch, getState) => {
        return fetcher.handleRequestAction(dispatch, {
            requestUrl: `${cityBaseUrl}/get-image-url/${name}`,
            requestActionName: cityActions.GET_IMAGE_URL,
            jsonResponseExpected: true,
            requestInit: {
                method: 'GET'
            }
        });
    };
}