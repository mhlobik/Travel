import * as React from 'react';
import './mainContent.scss';
import { IUser } from '../../common/facebookUtilities';
import UserPreferences from '../../containers/userPreferences/userPreferences';
import KnowledgeBased from '../recommenders/knowledgeBased';
import TopCities from '../recommenders/topCities';
import CollaborativeFiltering from '../recommenders/collaborativeFiltering';
import ContentBased from '../recommenders/contentBased';

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
                {this.props.user !== null && !this.props.goToPreferences &&
                <span>
                    <KnowledgeBased />
                    <CollaborativeFiltering/>
                    <ContentBased/>
                </span>
                }
                <TopCities />
            </div>
        );
    }
}
