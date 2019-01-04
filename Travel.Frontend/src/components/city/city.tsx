import * as React from 'react';
import './city.scss';
import { ICity } from '../../common/city';

interface ICityProps {
    selectedRecommendedCity: ICity;
    closeCityDetails(): void;
}

export default class City extends React.PureComponent<ICityProps, {}> {
    public render() {
        console.log('City', this.props.selectedRecommendedCity);
        return (
            <div className="city__container">
                <span className="city__title">{this.props.selectedRecommendedCity.name}</span>
                <span className="close" onClick={this.props.closeCityDetails}></span>
            </div>
        );
    }
}