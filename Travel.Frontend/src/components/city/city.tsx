import * as React from 'react';
import './city.scss';
import { ICity, cityAvailableTabs, IPointOfInterestsCityInfo } from '../../common/city';
import { Pivot, PivotItem, PivotLinkFormat, autobind } from 'quick-react-ts';
import { CityTabEnum } from '../../common/enums';
import CityDescriptionTab from './cityDescriptionTab';
import CityPointsOfInterests from './cityPointsOfInterests';
import { ICarouselData } from '../mainContent/mainContent';

interface ICityProps {
    selectedRecommendedCity: ICity;
    pointsOfInterestsInfo: Array<ICarouselData>;
    isGettingPointsOfInterestsInfo: boolean;
    closeCityDetails(): void;
    onGetPointOfInterestsImageUrl(city: ICity): void;
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
    private renderTabContent(): JSX.Element {
        switch (this.state.selectedTab) {
            case CityTabEnum.description:
                return <CityDescriptionTab
                    cityName={this.props.selectedRecommendedCity.name}
                    description={this.props.selectedRecommendedCity.description}
                    imageUrl={this.props.selectedRecommendedCity.imageUrl}
                />;
            case CityTabEnum.flights:
                return <span>flights</span>;
            case CityTabEnum.hotels:
                return <span>hotels</span>;
            case CityTabEnum.pointsOfInterests:
            this.props.onGetPointOfInterestsImageUrl(this.props.selectedRecommendedCity);
                return <CityPointsOfInterests
                    pointsOfInterestsInfo={this.props.pointsOfInterestsInfo}
                    isGettingPointsOfInterestsInfo={this.props.isGettingPointsOfInterestsInfo}
                />;
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