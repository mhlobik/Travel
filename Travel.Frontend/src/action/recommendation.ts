import * as recommendationActions from '../constants/recommend';
import fetcher from '../common/fetcher';

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