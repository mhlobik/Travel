import { combineReducers } from 'redux';
const { routerReducer } = require('react-router-redux');
import appReducer, { IAppReducerState } from './appReducer';

export interface IRootReducerState {
  routing: any;
  app: IAppReducerState;
}

const rootReducer = combineReducers<IRootReducerState>({
  routing: routerReducer,
  app: appReducer
});

export default rootReducer;
