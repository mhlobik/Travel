import { combineReducers } from 'redux';
const { routerReducer } = require('react-router-redux');
import appReducer, { IAppReducerState } from './appReducer';
import facebookReducer, { IFacebookReducerState } from './facebookReducer';
import mainReducer, { IMainReducerState } from './mainReducer';
import recommendationReducer, { IRecommendationReducerState } from './recommendationReducer';

export interface IRootReducerState {
  routing: any;
  app: IAppReducerState;
  facebook: IFacebookReducerState;
  main: IMainReducerState;
  recommendation: IRecommendationReducerState;
}

const rootReducer = combineReducers<IRootReducerState>({
  routing: routerReducer,
  app: appReducer,
  facebook: facebookReducer,
  main: mainReducer,
  recommendation: recommendationReducer
});

export default rootReducer;
