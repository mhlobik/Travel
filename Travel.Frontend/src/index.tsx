import 'babel-polyfill';
import 'ts-helpers';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.scss';

import configureStore from './store/configureStore';
import App from './containers/app/app';
import HomePage from './containers/homePage/homePage';
import './assets/styles/fonts.scss';
import * as appActions from './action/app';

const { Provider } = require('react-redux');
const { Router, hashHistory, Route, IndexRoute } = require('react-router');
const { syncHistoryWithStore } = require('react-router-redux');
const store = configureStore({});
const history = syncHistoryWithStore(hashHistory, store);

export default class Index extends React.Component<any, any> {
    public constructor(props: any) {
        super(props);
        store.dispatch(appActions.storeSettings());
    }

    public render() {
        return (
            <Provider store={store}>
                <Router history={history} >
                    <Route exact path="/" component={App}>
                        <IndexRoute component={HomePage} />
                    </Route>
                </Router>
            </Provider>
        );
    }
}

ReactDOM.render(<Index />, document.getElementById('root'));
