import * as React from 'react';
import { connect } from 'react-redux';
import { IRootReducerState } from '../../reducers/rootReducer';
import './mainContent.scss';
import Facebook from '../../containers/facebook/facebook';
import { IUser } from '../../common/facebookUtilities';
import UserPreferences from '../../containers/userPreferences/userPreferences';
import CityChooserTile from '../../containers/cityChooser/cityChooserTile';
import { ICity } from '../../common/city';
import { autobind, Spinner } from 'quick-react-ts';
import CityChooser from '../../containers/cityChooser/cityChooser';
import { Z_FINISH } from 'zlib';

interface IMainContentProps {
    userLoggedIn: boolean;
    user: IUser;
    continueClicked: boolean;
}

export default class MainContent extends React.PureComponent<IMainContentProps, {}> {
    public render() {
        return (
            <div key="container" className="main-content__container">
            {this.props.user !== null && this.props.continueClicked && <UserPreferences />}
            {this.props.user !== null && !this.props.continueClicked && <CityChooser/>}
          </div>
        );
    }
}
