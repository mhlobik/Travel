import * as React from 'react';
import './mainContent.scss';
import { IUser } from '../../common/facebookUtilities';
import UserPreferences from '../../containers/userPreferences/userPreferences';
import CityChooser from '../../containers/cityChooser/cityChooser';
import { IRecommendation } from '../../common/recommendationUtilities';
import KnowledgeBased from '../recommenders/knowledgeBased';

interface IMainContentProps {
    userLoggedIn: boolean;
    user: IUser;
    continueClicked: boolean;
    userPreferencesSaved: boolean;
    knowledgeBasedRecommendations: Array<IRecommendation>;
}

export interface ICarouselData {
    content: string;
    author: string;
    source: string;
}

export default class MainContent extends React.PureComponent<IMainContentProps, {}> {
    public render() {
        return (
            <div key="container" className="main-content__container">
                {this.props.user !== null && this.props.continueClicked && !this.props.userPreferencesSaved && <UserPreferences />}
                {this.props.user !== null && !this.props.continueClicked && <CityChooser />}

                {this.props.user !== null && this.props.continueClicked && this.props.userPreferencesSaved &&
                    <KnowledgeBased knowledgeBasedRecommendations={this.props.knowledgeBasedRecommendations}/>
                }
            </div>
        );
    }
}
