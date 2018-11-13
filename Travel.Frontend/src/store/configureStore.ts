import {
  createStore,
  applyMiddleware
} from 'redux';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer, { IRootReducerState } from '../reducers/rootReducer';

function configureStore(initialState: any) {
  const store = createStore<IRootReducerState>(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(..._getMiddleware())
    )
  );

  _enableHotLoader(store);
  return store;
}

function _getMiddleware() {
  const middleware = [
    thunk
  ];

  if (process.env.NODE_ENV === `development`) {
    middleware.push(logger);
  }

  return [...middleware];
}

// tslint:disable-next-line
const environment: any = window || this;

function _enableHotLoader(store: any) {
  return;
}

export default configureStore;
