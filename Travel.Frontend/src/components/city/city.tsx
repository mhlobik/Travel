import * as React from 'react';
import './city.scss';
import { ICity, cityAvailableTabs } from '../../common/city';
import { Pivot, PivotItem, PivotLinkFormat, autobind } from 'quick-react-ts';

interface ICityProps {
    selectedRecommendedCity: ICity;
    selectedTab: string;
    closeCityDetails(): void;
    goToCityTabClick(itemKey: number): void;
}

export default class City extends React.PureComponent<ICityProps, {}> {
    @autobind
    private handleGoToCityTabClick(pivotItem: PivotItem) {
        this.props.goToCityTabClick(parseInt(pivotItem.props.itemKey));
    }

    public render() {
        const availableTabs = cityAvailableTabs;
        console.log('City', availableTabs);
        return (
            <div className="city__container">
                <span className="city__title">{this.props.selectedRecommendedCity.name}</span>
                <span className="close" onClick={this.props.closeCityDetails}></span>
                {availableTabs.length > 0 &&
                    <div className="report-header__tabs">
                        <Pivot
                            onLinkClick={this.handleGoToCityTabClick}
                            selectedKey={this.props.selectedTab}
                            linkFormat={PivotLinkFormat.minimalTabsNoBorders}
                        >{availableTabs.map(x => {
                            return (
                                <PivotItem
                                    key={x.type}
                                    itemKey={x.type.toString()}
                                    linkText={x.name}>
                                </PivotItem>);
                        })}
                        </Pivot>
                    </div>
                }
            </div>
        );
    }
}