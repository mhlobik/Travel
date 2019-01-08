import { IAction } from '../common/appDataStructures';
import * as recommendationActions from '../constants/recommend';
import { ICity } from '../common/city';
import { IRecommendation } from '../common/recommendationUtilities';

export interface IRecommendationReducerState {
    isGettingKnowledgeBased: boolean;
    knowledgeBasedRecommendations: Array<IRecommendation>;
    selectedRecommendation: IRecommendation;
    openRecommendedItem: boolean;
}

const initialState: IRecommendationReducerState = {
    isGettingKnowledgeBased: false,
    knowledgeBasedRecommendations: [],
    selectedRecommendation: null,
    openRecommendedItem: false
};

export default function facebookReducer(state: IRecommendationReducerState = initialState, action: IAction = { type: '', payload: null }) {
    switch (action.type) {
        case `${recommendationActions.GET_KNOWLEDGE_BASED}_REQUEST`:
            return {
                ...state,
                isGettingKnowledgeBased: true            };
        case `${recommendationActions.GET_KNOWLEDGE_BASED}_RESPONSE`:
            return {
                ...state,
                isGettingKnowledgeBased: false,
                knowledgeBasedRecommendations: action.payload
            };
        case `${recommendationActions.GET_KNOWLEDGE_BASED}_ERROR`:
            return {
                ...state,
                isGettingKnowledgeBased: false
            };
        case recommendationActions.OPEN_RECOMMENDED_ITEM:
            return {
                ...state,
                openRecommendedItem: true,
                selectedRecommendation: action.payload
            };
        case recommendationActions.CLOSE_RECOMMENDED_ITEM:
            return {
                ...state,
                openRecommendedItem: action.payload,
                selectedRecommendation: null
            };
        default:
            return state;
    }
}