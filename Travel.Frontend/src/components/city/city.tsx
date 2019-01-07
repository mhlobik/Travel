import * as React from 'react';
import './city.scss';
import { ICity, cityAvailableTabs, IPointOfInterestsCityInfo, IFlight, IFlightViewModel } from '../../common/city';
import { Pivot, PivotItem, PivotLinkFormat, autobind } from 'quick-react-ts';
import { CityTabEnum } from '../../common/enums';
import CityDescriptionTab from './cityDescriptionTab';
import CityPointsOfInterests from './cityPointsOfInterests';
import { ICarouselData } from '../mainContent/mainContent';
import Ratings from './ratings';
import CityFlights from './cityFlights';

interface ICityProps {
    selectedRecommendedCity: ICity;
    pointsOfInterestsInfo: Array<ICarouselData>;
    isGettingPointsOfInterestsInfo: boolean;
    flights: Array<IFlightViewModel>;
    isGettingFlights: boolean;
    closeCityDetails(): void;
    onClickCityRating(cityId: string, rate: number): void;
    onSearchClick(departureDate: Date, returnDate: Date, city: ICity): void;
}

interface ICityState {
    selectedTab: string;
}

export default class City extends React.PureComponent<ICityProps, ICityState> {
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
        this.props.onClickCityRating(this.props.selectedRecommendedCity.cityId, rate);
    }

    @autobind
    private handleOnSearchClicked(departureDate: Date, returnDate: Date) {
        this.props.onSearchClick(departureDate, returnDate, this.props.selectedRecommendedCity);
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
                return <span>hotels</span>;
            case CityTabEnum.pointsOfInterests:
                return <CityPointsOfInterests
                    pointsOfInterestsInfo={this.props.pointsOfInterestsInfo}
                    isGettingPointsOfInterestsInfo={this.props.isGettingPointsOfInterestsInfo}
                />;
            case CityTabEnum.ratings:
                return <Ratings onClickCityRating={this.onClickCityRating} />;
        }
    }
    public render() {
        const availableTabs = cityAvailableTabs;
        return (
            <div className="city__container">
                <span className="close" onClick={this.props.closeCityDetails}></span>
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