import { combineReducers } from 'redux';
const { routerReducer } = require('react-router-redux');
import appReducer, { IAppReducerState } from './appReducer';
import facebookReducer, { IFacebookReducerState } from './facebookReducer';
import mainReducer, { IMainReducerState } from './mainReducer';

export interface IRootReducerState {
  routing: any;
  app: IAppReducerState;
  facebook: IFacebookReducerState;
  main: IMainReducerState;
}

const rootReducer = combineReducers<IRootReducerState>({
  routing: routerReducer,
  app: appReducer,
  facebook: facebookReducer,
  main: mainReducer
});

export default rootReducer;
