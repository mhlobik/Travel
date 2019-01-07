import * as React from 'react';
import Carousel from '../carousel/carousel';
import { IRecommendation } from '../../common/recommendationUtilities';
import './knowledgeBased.scss';
import { ICity, IPointOfInterestsCityInfo, IFlight, IFlightViewModel } from '../../common/city';
import City from '../city/city';
import { autobind } from 'quick-react-ts';
import { ICarouselData } from '../mainContent/mainContent';

interface IKnowledgeBasedProps {
    knowledgeBasedRecommendations: Array<IRecommendation>;
    selectedRecommendedCity: ICity;
    openRecommendedItem: boolean;
    pointsOfInterestsInfo: Array<ICarouselData>;
    isGettingPointsOfInterestsInfo: boolean;
    flights: Array<IFlightViewModel>;
    isGettingFlights: boolean;
    handleOnItemClick(recommendedCity: ICity): void;
    onCloseRecommendedItem(): void;
    onClickCityRating(cityId: string, rate: number): void;
    onSearchClick(departureDate: Date, returnDate: Date, city: ICity): void;
}

export default class KnowledgeBased extends React.PureComponent<IKnowledgeBasedProps, {}> {
    public render() {
        return (
            <div className="knowledge-based__container">
                <span className="knowledge-based__title">Cities based on your preferences:</span>
                <Carousel
                    knowledgeBasedRecommendations={this.props.knowledgeBasedRecommendations}
                    handleOnItemClick={this.props.handleOnItemClick}
                    isClickable={true}
                />

                {this.props.openRecommendedItem && this.props.selectedRecommendedCity !== null &&
                    <City
                        selectedRecommendedCity={this.props.selectedRecommendedCity}
                        closeCityDetails={this.props.onCloseRecommendedItem}
                        pointsOfInterestsInfo={this.props.pointsOfInterestsInfo}
                        isGettingPointsOfInterestsInfo={this.props.isGettingPointsOfInterestsInfo}
                        onClickCityRating={this.props.onClickCityRating}
                        flights={this.props.flights}
                        onSearchClick={this.props.onSearchClick}
                        isGettingFlights={this.props.isGettingFlights}
                    />
                }
            </div>
        );
    }
}