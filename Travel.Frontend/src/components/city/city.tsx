import * as React from 'react';
import './city.scss';
import { ICity, cityAvailableTabs, IPointOfInterestsCityInfo, IFlight, IFlightViewModel, ICityRating, IHotel } from '../../common/city';
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

interface ICityProps {
    userId?: string;
    selectedRecommendedCity?: ICity;
    pointsOfInterestsInfo?: Array<ICarouselData>;
    isGettingPointsOfInterestsInfo?: boolean;
    flights?: Array<IFlightViewModel>;
    isGettingFlights?: boolean;
    cityRating?: ICityRating;
    isGettingCityRating?: boolean;
    hotels?: Array<IHotel>;
    isGettingHotels?: boolean;
    onCloseRecommendedItem?(): void;
    onClickCityRating?(cityId: string, userId: string, rate: number): void;
    onSearchClick?(departureDate: Date, returnDate: Date, city: ICity): void;

}

interface ICityState {
    selectedTab: string;
}

function mapStateToProps(state: IRootReducerState): ICityProps {
    return {
        userId: state.facebook.user.userId,
        selectedRecommendedCity: state.recommendation.selectedRecommendedCity,
        pointsOfInterestsInfo: state.city.pointsOfInterestsInfo,
        isGettingPointsOfInterestsInfo: state.city.isGettingPointsOfInterestsInfo,
        flights: state.city.flights,
        isGettingFlights: state.city.isGettingFlights,
        cityRating: state.city.cityRating,
        isGettingCityRating: state.city.isGettingCityRating,
        hotels: state.city.hotels,
        isGettingHotels: state.city.isGettingHotels
    };
}

function mapDispatchToProps(dispatch: any): ICityProps {
    return {
        onCloseRecommendedItem: () => dispatch(recommendationActions.closeRecommendedItem()),
        onClickCityRating: (cityId: string, userId: string, rate: number) => dispatch(cityActions.saveCityRating(cityId, userId, rate)),
        onSearchClick: (departureDate: Date, returnDate: Date, city: ICity) =>
            dispatch(cityActions.getCityFlights(departureDate, returnDate, city))
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
        this.props.onClickCityRating(this.props.selectedRecommendedCity.cityId, this.props.userId, rate);
    }

    @autobind
    private handleOnSearchClicked(departureDate: Date, returnDate: Date) {
        this.props.onSearchClick(departureDate, returnDate, this.props.selectedRecommendedCity);
    }

    @autobind
    private handleOnCloseCityDetails() {
        this.props.onCloseRecommendedItem();
    }

    @autobind
    private renderTabContent(): JSX.Element {
        switch (this.state.selectedTab) {
            case CityTabEnum.description:
                return <CityDescriptionTab
                    cityName={this.props.selectedRecommendedCity.name}
                    description={this.props.selectedRecommendedCity.description}
                    imageUrl={this.props.selectedRecommendedCity.imageUrl}
                />;
            case CityTabEnum.flights:
                return <CityFlights
                    flights={this.props.flights}
                    onSearchClick={this.handleOnSearchClicked}
                    isGettingFlights={this.props.isGettingFlights}
                />;
            case CityTabEnum.hotels:
                return <CityHotels
                    cityName={this.props.selectedRecommendedCity.name}
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
                    cityName={this.props.selectedRecommendedCity.name}
                    cityRating={this.props.cityRating}
                    isGettingCityRating={this.props.isGettingCityRating}
                    onClickCityRating={this.onClickCityRating}
                />;
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