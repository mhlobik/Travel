import * as recommendationActions from '../constants/recommend';
import fetcher from '../common/fetcher';
import { ICity } from '../common/city';
import { getImageUrls } from './city';
import * as cityActionsCreator from './city';
import { IRecommendation } from '../common/recommendationUtilities';

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

export function openRecommendedItem(recommendation: IRecommendation) {
    return (dispatch, getState) => {
        dispatch(getImageUrls(recommendation.recommendedCity));
        dispatch(handleOpenRecommendedItem(recommendation));
        dispatch(cityActionsCreator.getCityRating(recommendation.recommendedCity.cityId));
        dispatch(cityActionsCreator.getCityHotels(recommendation.recommendedCity));
    };
}

export function handleOpenRecommendedItem(recommendation: IRecommendation) {
    return {
        type: recommendationActions.OPEN_RECOMMENDED_ITEM,
        payload: recommendation
    };
}

export function closeRecommendedItem() {
    return {
        type: recommendationActions.CLOSE_RECOMMENDED_ITEM,
        payload: false
    };
}

export function saveRecommendation(recommendation: IRecommendation) {
    return (dispatch, getState) => {
        return fetcher.handleRequestAction(dispatch, {
            requestUrl: `${recommendationBaseUrl}/save-recommendation`,
            requestActionName: recommendationActions.SAVE_RECOMMENDATION,
            jsonResponseExpected: false,
            requestInit: {
                method: 'POST',
                body: JSON.stringify(recommendation)
            }
        });
    };
}

export function getRecommendationRating(recommendation: IRecommendation) {
    return (dispatch, getState) => {
        return fetcher.handleRequestAction(dispatch, {
            requestUrl: `${recommendationBaseUrl}/get-recommendation-rating`,
            requestActionName: recommendationActions.GET_RECOMMENDATION_RATING,
            jsonResponseExpected: true,
            requestInit: {
                method: 'POST',
                body: JSON.stringify(recommendation)
            }
        });
    };
}