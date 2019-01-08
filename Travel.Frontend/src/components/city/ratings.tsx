import * as React from 'react';
import Rating from 'react-rating';
import * as StarEmpty from '../../assets/images/star-empty.png';
import * as StarFull from '../../assets/images/star-full.png';
import { autobind } from 'quick-react-ts';
import { ICityRating } from '../../common/city';
import { ratingCity, ratingRecommendation } from '../../assets/strings/strings';

interface IRatingsProps {
    cityRating: ICityRating;
    isGettingCityRating: boolean;
    cityName: string;
    onClickCityRating(rate: number): void;
}

export default class Ratings extends React.PureComponent<IRatingsProps, {}> {
    @autobind
    private handleOnClickCityRating(rate: number) {
        this.props.onClickCityRating(rate);
    }

    @autobind
    private onClickRecommendationRationg(ev: any) {
        console.log('onClickRecommendationRationg', ev);
        // trebam userId, recommendationId
    }

    public render() {
        const initialCityRating = this.props.cityRating !== null ? this.props.cityRating.rating : 0;

        return (
            <div className="ratings__container">
                <span className="ratings__title">{ratingCity(this.props.cityName)}</span>
                <Rating
                    emptySymbol={<img src={StarEmpty} className="icon" />}
                    fullSymbol={<img src={StarFull} className="icon" />}
                    onClick={this.handleOnClickCityRating}
                    initialRating={initialCityRating}
                />
                <span className="ratings__title">{ratingRecommendation(this.props.cityName)}</span>
                <Rating
                    emptySymbol={<img src={StarEmpty} className="icon" />}
                    fullSymbol={<img src={StarFull} className="icon" />}
                    onClick={this.onClickRecommendationRationg}
                    initialRating={3}
                />
            </div>
        );
    }
}