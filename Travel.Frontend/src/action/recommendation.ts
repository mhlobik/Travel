import * as recommendationActions from '../constants/recommend';
import fetcher from '../common/fetcher';
import { ICity } from '../common/city';

const recommendationBaseUrl = 'api/recommendation';

export function getKnowledgeBased(userId: string) {
    return (dispatch, getState) => {
        return fetcher.handleRequestAction(dispatch, {
            requestUrl: `${recommendationBaseUrl}/get-knowledge-based/${userId}`,
            requestActionName: recommendationActions.GET_KNOWLEDGE_BASED,
            jsonResponseExpected: true,
            requestInit: {
                method: 'GET'
            }
        });
    };
}

export function openRecommendedItem(recommendedCity: ICity) {
    return {
        type: recommendationActions.OPEN_RECOMMENDED_ITEM,
        payload: { recommendedCity: recommendedCity}
    };
}

export function closeRecommendedItem() {
    return {
        type: recommendationActions.CLOSE_RECOMMENDED_ITEM,
        payload: { openRecommendedItem: false }
    };
}