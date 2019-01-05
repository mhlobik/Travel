import * as React from 'react';
import './mainContent.scss';
import { IUser } from '../../common/facebookUtilities';
import UserPreferences from '../../containers/userPreferences/userPreferences';
import CityChooser from '../../containers/cityChooser/cityChooser';
import { IRecommendation } from '../../common/recommendationUtilities';
import KnowledgeBased from '../recommenders/knowledgeBased';
import { ICity, IPointOfInterestsCityInfo } from '../../common/city';
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
    pointsOfInterestsInfo: Array<ICarouselData>;
    isGettingPointsOfInterestsInfo: boolean;
    handleOnItemClick(recommendedCity: ICity): void;
    onCloseRecommendedItem(): void;
    onGetPointOfInterestsImageUrl(city: ICity): void;
}

export interface ICarouselData {
    image: string;
    title: string;
}

export default class MainContent extends React.PureComponent<IMainContentProps, {}> {
    public render() {
        return (
            <div key="container" className="main-content__container">
                {this.props.user !== null && this.props.continueClicked && !this.props.userPreferencesSaved && <UserPreferences />}
                {this.props.user !== null && !this.props.continueClicked && <CityChooser />}

                {this.props.user !== null && this.props.continueClicked && this.props.userPreferencesSaved &&
                    <KnowledgeBased
                        knowledgeBasedRecommendations={this.props.knowledgeBasedRecommendations}
                        handleOnItemClick={this.props.handleOnItemClick}
                        openRecommendedItem={this.props.openRecommendedItem}
                        selectedRecommendedCity={this.props.selectedRecommendedCity}
                        onCloseRecommendedItem={this.props.onCloseRecommendedItem}
                        onGetPointOfInterestsImageUrl={this.props.onGetPointOfInterestsImageUrl}
                        pointsOfInterestsInfo={this.props.pointsOfInterestsInfo}
                        isGettingPointsOfInterestsInfo={this.props.isGettingPointsOfInterestsInfo}
                    />
                }
            </div>
        );
    }
}
