import 'isomorphic-fetch';
import { getServiceEndpoint } from '../common/serviceEndpoint';

interface IRequestActionOptions {
    requestUrl: string;
    requestActionName: string;
    requestActionPayload?: any;
    jsonResponseExpected?: boolean;
    requestInit?: RequestInit;
    responsePayloadMapper?(payload: any): any;
    errorPayloadMapper?(error: any): any;
}

class Fetcher {
    private readonly init: RequestInit = {
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    public fetch(url: RequestInfo, requestInit?: RequestInit): Promise<Response> {
        const init = { ...this.init, ...requestInit };
        return fetch(url, init);
    }

    public handleRequestAction(dispatch: any, options: IRequestActionOptions): Promise<any> {
        options = { ...options };

        const requestAction = `${options.requestActionName}_REQUEST`;
        const responseAction = `${options.requestActionName}_RESPONSE`;
        const errorAction = `${options.requestActionName}_ERROR`;

        if (options.jsonResponseExpected === undefined) {
            options.jsonResponseExpected = true;
        }

        dispatch({
            type: requestAction,
            payload: options.requestActionPayload
        });

        let url = options.requestUrl;
        if (!options.requestUrl.startsWith('http')) {
            if (!url.startsWith('/')) {
                url = getServiceEndpoint() + '/' + url;
            } else {
                url = getServiceEndpoint() + url;
            }
        }

        return fetch(url, { ...this.init, ...options.requestInit })
            .then(response => {
                if (response.ok) {
                    if (options.jsonResponseExpected) {
                        return response.json().then(jsonResponse => {
                            dispatch({
                                type: responseAction,
                                payload: options.responsePayloadMapper ? options.responsePayloadMapper(jsonResponse) : jsonResponse
                            });
                            return Promise.resolve(jsonResponse);
                        });
                    } else {
                        dispatch({
                            type: responseAction,
                            payload: null
                        });
                        return Promise.resolve();
                    }
                } else {
                    let payload = { status: response.status, body: null };
                    return response.json().then(errorResponse => {
                        payload = { ...payload, body: errorResponse };
                    }).then(resp => {
                        return Promise.reject(payload);
                    }).catch(err => Promise.reject(payload));
                }
            }).catch(error => {
                let payload = error.status !== undefined && error.body !== undefined && error || null;

                if (options.errorPayloadMapper) {
                    payload = options.errorPayloadMapper(payload);
                }

                dispatch({
                    type: errorAction,
                    payload: payload
                });

                return Promise.reject(error);
            });
    }
}

const fetcher = new Fetcher();

export default fetcher;
