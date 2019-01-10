import * as React from 'react';
import Carousel from '../carousel/carousel';
import { ICarouselData } from '../mainContent/mainContent';
import { IPointOfInterestsCityInfo, ICity, IPointsOfInterest } from '../../common/city';
import { Spinner } from 'quick-react-ts';

interface ICityPointsOfInterestsProps {
    pointsOfInterestsInfo: Array<ICarouselData>;
    isGettingPointsOfInterestsInfo: boolean;
}

export default class CityPointsOfInterests extends React.PureComponent<ICityPointsOfInterestsProps, {}> {
    public render() {
        return (
            <div className="city-points-of-interests__container">
                <Carousel
                    carouselData={this.props.pointsOfInterestsInfo}
                    isClickable={false}
                    isLoading={this.props.isGettingPointsOfInterestsInfo}
                />
            </div>
        );
    }
}