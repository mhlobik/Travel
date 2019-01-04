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
                <img src={this.props.selectedRecommendedCity.imageUrl} height="298" width="298"></img>
                <span className="city__title">bla</span>
            </div>
        );
    }
}