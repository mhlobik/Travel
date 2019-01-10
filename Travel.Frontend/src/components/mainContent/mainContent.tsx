import * as React from 'react';
import './mainContent.scss';
import { IUser } from '../../common/facebookUtilities';
import UserPreferences from '../../containers/userPreferences/userPreferences';
import KnowledgeBased from '../recommenders/knowledgeBased';
import TopCities from '../recommenders/topCities';

interface IMainContentProps {
    userLoggedIn: boolean;
    user: IUser;
    continueClicked: boolean;
    userPreferencesSaved: boolean;
    goToPreferences: boolean;
}

export interface ICarouselData {
    image: string;
    title: string;
}

export default class MainContent extends React.PureComponent<IMainContentProps, {}> {
    public render() {
        return (
            <div key="container" className="main-content__container">
                {this.props.user !== null && this.props.goToPreferences && <UserPreferences />}
                <TopCities />
                {this.props.user !== null && !this.props.goToPreferences &&
                    <KnowledgeBased />
                }
            </div>
        );
    }
}
