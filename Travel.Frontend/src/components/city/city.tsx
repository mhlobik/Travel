import * as React from 'react';
import './city.scss';
import { ICity, cityAvailableTabs, IFlightViewModel, ICityRating, IHotel, IAirport } from '../../common/city';
import { Pivot, PivotItem, PivotLinkFormat, autobind } from 'quick-react-ts';
import { CityTabEnum } from '../../common/enums';
import CityDescriptionTab from './cityDescriptionTab';
import CityPointsOfInterests from './cityPointsOfInterests';
import { ICarouselData } from '../mainContent/mainContent';
import Ratings from './ratings';
import CityFlights from './cityFlights';
import { IRootReducerState } from '../../reducers/rootReducer';
import * as cityActions from '../../action/city';
import * as recommendationActions from '../../action/recommendation';
import { connect } from 'react-redux';
import CityHotels from './cityHotels';
import { IRecommendation } from '../../common/recommendationUtilities';
import { IUser, IUserProfile } from '../../common/facebookUtilities';

interface ICityProps {
    user?: IUser;
    userProfile?: IUserProfile;
    selectedRecommendation?: IRecommendation;
    pointsOfInterestsInfo?: Array<ICarouselData>;
    isGettingPointsOfInterestsInfo?: boolean;
    flights?: Array<IFlightViewModel>;
    isGettingFlights?: boolean;
    cityRating?: ICityRating;
    isGettingCityRating?: boolean;
    hotels?: Array<IHotel>;
    isGettingHotels?: boolean;
    recommendationRating?: number;
    airports?: Array<IAirport>;
    isLoggedIn?: boolean;
    onCloseRecommendedItem?(): void;
    onClickCityRating?(cityId: string, user: IUser, rate: number): void;
    onSearchClick?(departureDate: Date, returnDate: Date, originSelected: string, destinationSelected: string): void;
    onClickRecommendationRating?(updatedRecommendation: IRecommendation): void;
}

interface ICityState {
    selectedTab: string;
}

function mapStateToProps(state: IRootReducerState): ICityProps {
    return {
        user: state.facebook.user,
        userProfile: state.facebook.userProfile,
        selectedRecommendation: state.recommendation.selectedRecommendation,
        pointsOfInterestsInfo: state.city.pointsOfInterestsInfo,
        isGettingPointsOfInterestsInfo: state.city.isGettingPointsOfInterestsInfo,
        flights: state.city.flights,
        isGettingFlights: state.city.isGettingFlights,
        cityRating: state.city.cityRating,
        isGettingCityRating: state.city.isGettingCityRating,
        hotels: state.city.hotels,
        isGettingHotels: state.city.isGettingHotels,
        airports: state.city.airports,
        isLoggedIn: state.facebook.userLoggedIn
    };
}

function mapDispatchToProps(dispatch: any): ICityProps {
    return {
        onCloseRecommendedItem: () => dispatch(recommendationActions.closeRecommendedItem()),
        onClickCityRating: (cityId: string, user: IUser, rate: number) => dispatch(cityActions.saveCityRating(cityId, user, rate)),
        onSearchClick: (departureDate: Date, returnDate: Date, originSelected: string, destinationSelected: string) =>
            dispatch(cityActions.getCityFlights(departureDate, returnDate, originSelected, destinationSelected)),
        onClickRecommendationRating: (updatedRecommendation: IRecommendation) =>
            dispatch(recommendationActions.saveRecommendation(updatedRecommendation))
    };
}

function mergeProps(
    stateProps: ICityProps,
    dispatchProps: ICityProps
): ICityProps {
    return {
        ...stateProps,
        ...dispatchProps
    };
}

class City extends React.PureComponent<ICityProps, ICityState> {
    constructor(props: ICityProps) {
        super(props);

        this.state = {
            selectedTab: '0'
        };
    }

    @autobind
    private handleGoToCityTabClick(pivotItem: PivotItem) {
        this.setState({ selectedTab: pivotItem.props.itemKey });
    }

    @autobind
    private onClickCityRating(rate: number) {
        this.props.onClickCityRating(this.props.selectedRecommendation.recommendedCity.cityId, this.props.user, rate);
    }

    @autobind
    private handleOnCloseCityDetails() {
        this.props.onCloseRecommendedItem();
    }

    @autobind
    private handleOnClickRecommendationRating(rate: number) {
        const updatedRecommendation: IRecommendation = {
            rating: rate,
            recommendedCity: this.props.selectedRecommendation.recommendedCity,
            recommenderModel: this.props.selectedRecommendation.recommenderModel,
            similarity: this.props.selectedRecommendation.similarity,
            userId: this.props.selectedRecommendation.userId
        };

        this.props.onClickRecommendationRating(updatedRecommendation);
    }

    @autobind
    private renderTabContent(): JSX.Element {
        switch (this.state.selectedTab) {
            case CityTabEnum.description:
                return <CityDescriptionTab
                    cityName={this.props.selectedRecommendation.recommendedCity.name}
                    description={this.props.selectedRecommendation.recommendedCity.description}
                    imageUrl={this.props.selectedRecommendation.recommendedCity.imageUrl}
                />;
            case CityTabEnum.flights:
                return <CityFlights
                    airports={this.props.airports}
                    flights={this.props.flights}
                    onSearchClick={this.props.onSearchClick}
                    isGettingFlights={this.props.isGettingFlights}
                    userLocation={this.props.userProfile.locationName}
                    cityName={this.props.selectedRecommendation.recommendedCity.name}
                />;
            case CityTabEnum.hotels:
                return <CityHotels
                    cityName={this.props.selectedRecommendation.recommendedCity.name}
                    hotels={this.props.hotels}
                    isGettingHotels={this.props.isGettingHotels}
                />;
            case CityTabEnum.pointsOfInterests:
                return <CityPointsOfInterests
                    pointsOfInterestsInfo={this.props.pointsOfInterestsInfo}
                    isGettingPointsOfInterestsInfo={this.props.isGettingPointsOfInterestsInfo}
                />;
            case CityTabEnum.ratings:
                return <Ratings
                    cityName={this.props.selectedRecommendation.recommendedCity.name}
                    cityRating={this.props.cityRating}
                    isGettingCityRating={this.props.isGettingCityRating}
                    onClickCityRating={this.onClickCityRating}
                    recommendationRating={this.props.selectedRecommendation.rating}
                    onClickRecommendationRating={this.handleOnClickRecommendationRating}
                    isLoggedIn={this.props.isLoggedIn}
                />;
            case CityTabEnum.recommendationForYou:
                return <span></span>;
        }
    }
    public render() {
        const availableTabs = cityAvailableTabs;
        return (
            <div className="city__container">
                <span className="close" onClick={this.handleOnCloseCityDetails}></span>
                {availableTabs.length > 0 &&
                    <div className="city__tabs">
                        <Pivot
                            onLinkClick={this.handleGoToCityTabClick}
                            selectedKey={this.state.selectedTab}
                            linkFormat={PivotLinkFormat.minimalTabs}
                        >{availableTabs.map(x => {
                            return (
                                <PivotItem
                                    key={x.type}
                                    itemKey={x.type}
                                    linkText={x.name}>
                                </PivotItem>);
                        })}
                        </Pivot>
                    </div>
                }
                {this.renderTabContent()}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(City);