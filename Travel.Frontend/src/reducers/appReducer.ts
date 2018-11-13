import { IAction } from '../common/appDataStructures';

export interface IAppReducerState {
    expandedModules: Array<number>;
    expandedScripts: Array<number>;
}

const initialState: IAppReducerState = {
    expandedModules: [],
    expandedScripts: []
};

export default function appReducer(state: IAppReducerState = initialState, action: IAction = { type: '', payload: null }) {
    switch (action.type) {
        default:
            return state;
    }
}