import * as React from 'react';
import './mainContent.scss';
import { IUser } from '../../common/facebookUtilities';
import UserPreferences from '../../containers/userPreferences/userPreferences';
import CityChooser from '../../containers/cityChooser/cityChooser';
import { IRecommendation } from '../../common/recommendationUtilities';
import KnowledgeBased from '../recommenders/knowledgeBased';
import { ICity } from '../../common/city';
import City from '../city/city';
import { autobind } from 'quick-react-ts';

interface IMainContentProps {
    userLoggedIn: boolean;
    user: IUser;
    continueClicked: boolean;
    userPreferencesSaved: boolean;
    knowledgeBasedRecommendations: Array<IRecommendation>;
    selectedRecommendedCity: ICity;
    openRecommendedItem: boolean;
    handleOnItemClick(recommendedCity: ICity): void;
}

export interface ICarouselData {
    content: string;
    author: string;
    source: string;
}

export default class MainContent extends React.PureComponent<IMainContentProps, {}> {
    @autobind
    private onCloseRecommendedItem() {
        console.log('onCloseRecommendedItem');
    }
    public render() {
        console.log('MainContent', this.props.selectedRecommendedCity);

        return (
            <div key="container" className="main-content__container">
                {this.props.user !== null && this.props.continueClicked && !this.props.userPreferencesSaved && <UserPreferences />}
                {this.props.user !== null && !this.props.continueClicked && <CityChooser />}

                {this.props.user !== null && this.props.continueClicked
                    && this.props.userPreferencesSaved && !this.props.openRecommendedItem &&
                    <KnowledgeBased
                        knowledgeBasedRecommendations={this.props.knowledgeBasedRecommendations}
                        handleOnItemClick={this.props.handleOnItemClick}
                    />
                }

                {this.props.openRecommendedItem && this.props.selectedRecommendedCity !== null &&
                    <City selectedRecommendedCity={this.props.selectedRecommendedCity} closeCityDetails={this.onCloseRecommendedItem}/>
                }
            </div>
        );
    }
}
