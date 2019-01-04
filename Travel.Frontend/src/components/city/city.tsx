import * as React from 'react';
import './city.scss';
import { ICity, cityAvailableTabs } from '../../common/city';
import { Pivot, PivotItem, PivotLinkFormat, autobind } from 'quick-react-ts';
import { CityTabEnum } from '../../common/enums';
import CityDescriptionTab from './cityDescriptionTab';

interface ICityProps {
    selectedRecommendedCity: ICity;
    closeCityDetails(): void;
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
                    description={this.props.selectedRecommendedCity.description}
                    imageUrl={this.props.selectedRecommendedCity.imageUrl}
                />;
            case CityTabEnum.flights:
                return <span>flights</span>;
            case CityTabEnum.hotels:
                return <span>hotels</span>;
            case CityTabEnum.pointsOfInterests:
                return <span>pointsOfInterests</span>;
        }
    }
    public render() {
        const availableTabs = cityAvailableTabs;
        return (
            <div className="city__container">
                {/* <span className="city__title">{this.props.selectedRecommendedCity.name}</span> */}
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