import * as appActions from './../constants/app';

export function storeSettings() {
    return {
        type: appActions.STORE_SETTINGS,
        payload: null
    };
}