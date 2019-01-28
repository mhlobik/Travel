import { IAction } from '../common/appDataStructures';
import * as recommendationActions from '../constants/recommend';
import { ICity } from '../common/city';
import { IRecommendation } from '../common/recommendationUtilities';

export interface IRecommendationReducerState {
    isGettingKnowledgeBased: boolean;
    knowledgeBasedRecommendations: Array<IRecommendation>;
    selectedRecommendation: IRecommendation;
    openRecommendedItem: boolean;
    isGettingTopCities: boolean;
    topCitiesRecommendations: Array<IRecommendation>;
    collaborativeFilteringRecommendations: Array<IRecommendation>;
    isGettingCollaborativeFiltering: boolean;
    isGettingContentBased: boolean;
    contentBasedRecommendations: Array<IRecommendation>;
    isGettingSpecificRecommendation: boolean;
    specificRecommendation: ICity;
}

const initialState: IRecommendationReducerState = {
    isGettingKnowledgeBased: false,
    knowledgeBasedRecommendations: [],
    selectedRecommendation: null,
    openRecommendedItem: false,
    isGettingTopCities: false,
    topCitiesRecommendations: [],
    collaborativeFilteringRecommendations: [],
    isGettingCollaborativeFiltering: false,
    isGettingContentBased: false,
    contentBasedRecommendations: [],
    isGettingSpecificRecommendation: false,
    specificRecommendation: null
};

export default function recommendationReducer
    (state: IRecommendationReducerState = initialState, action: IAction = { type: '', payload: null }) {
    switch (action.type) {
        case `${recommendationActions.GET_KNOWLEDGE_BASED}_REQUEST`:
            return {
                ...state,
                isGettingKnowledgeBased: true
            };
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
        case `${recommendationActions.GET_TOP_CITIES}_REQUEST`:
            return {
                ...state,
                isGettingTopCities: true
            };
        case `${recommendationActions.GET_TOP_CITIES}_RESPONSE`:
            return {
                ...state,
                isGettingTopCities: false,
                topCitiesRecommendations: action.payload
            };
        case `${recommendationActions.GET_TOP_CITIES}_ERROR`:
            return {
                ...state,
                isGettingTopCities: false
            };
        case `${recommendationActions.GET_COLLABORATIVE_FILTERING}_REQUEST`:
            return {
                ...state,
                isGettingCollaborativeFiiltering: true
            };
        case `${recommendationActions.GET_COLLABORATIVE_FILTERING}_RESPONSE`:
            return {
                ...state,
                isGettingCollaborativeFiltering: false,
                collaborativeFilteringRecommendations: action.payload
            };
        case `${recommendationActions.GET_COLLABORATIVE_FILTERING}_ERROR`:
            return {
                ...state,
                isGettingCollaborativeFiltering: false
            };
        case `${recommendationActions.GET_CONTENT_BASED}_REQUEST`:
            return {
                ...state,
                isGettingContentBased: true
            };
        case `${recommendationActions.GET_CONTENT_BASED}_RESPONSE`:
            return {
                ...state,
                isGettingContentBased: false,
                contentBasedRecommendations: action.payload
            };
        case `${recommendationActions.GET_CONTENT_BASED}_ERROR`:
            return {
                ...state,
                isGettingContentBased: false
            };
        case `${recommendationActions.GET_SPECIFIC_RECOMMENDATION}_REQUEST`:
            return {
                ...state,
                isGettingSpecificRecommendation: true
            };
        case `${recommendationActions.GET_SPECIFIC_RECOMMENDATION}_RESPONSE`:
            return {
                ...state,
                isGettingSpecificRecommendation: false,
                specificRecommendation: action.payload
            };
        case `${recommendationActions.GET_SPECIFIC_RECOMMENDATION}_ERROR`:
            return {
                ...state,
                isGettingSpecificRecommendation: false
            };
        default:
            return state;
    }
}