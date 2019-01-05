import * as React from 'react';
import Rating from 'react-rating';
import * as StarEmpty from '../../assets/images/star-empty.png';
import * as StarFull from '../../assets/images/star-full.png';
import { autobind } from 'quick-react-ts';

interface IRatingsProps {
    onClickCityRating(rate: number): void;
}

export default class Ratings extends React.PureComponent<IRatingsProps, {}> {
    @autobind
    private handleOnClickCityRating(rate: number) {
        console.log('onClickCityRating', rate);
        this.props.onClickCityRating(rate);
    }

    @autobind
    private onClickRecommendationRationg(ev: any) {
        console.log('onClickRecommendationRationg', ev);
        // trebam userId, recommendationId
    }

    public render() {
        // dodaj logiku ako je nekad prije ocijenio grad i preporuku da se to odmah oznaci
        return (
            <div className="ratings__container">
                <span className="ratings__title">How much you like this city?</span>
                <Rating
                    emptySymbol={<img src={StarEmpty} className="icon" />}
                    fullSymbol={<img src={StarFull} className="icon" />}
                    onClick={this.handleOnClickCityRating}
                    initialRating={3}
                />
                <span className="ratings__title">How accurate the recommendation is?</span>
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