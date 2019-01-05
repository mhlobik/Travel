import * as React from 'react';
import Rating from 'react-rating';
import * as StarEmpty from '../../assets/images/star-empty.png';
import * as StarFull from '../../assets/images/star-full.png';
import { autobind } from 'quick-react-ts';

interface IRatingsProps {

}

export default class Ratings extends React.PureComponent<IRatingsProps, {}> {
    @autobind
    private onClickCityRating(ev: any) {
        console.log('onClickCityRating', ev);
        // trebam userId, cityId
    }

    @autobind
    private onClickRecommendationRationg(ev: any) {
        console.log('onClickRecommendationRationg', ev);
        // trebam userId, recommendationId
    }

    public render() {
        return (
            <div className="ratings__container">
                <span className="ratings__title">How much you like this city?</span>
                <Rating
                    emptySymbol={<img src={StarEmpty} className="icon" />}
                    fullSymbol={<img src={StarFull} className="icon" />}
                    onClick={this.onClickCityRating}
                />
                <span className="ratings__title">How accurate the recommendation is?</span>
                <Rating
                    emptySymbol={<img src={StarEmpty} className="icon" />}
                    fullSymbol={<img src={StarFull} className="icon" />}
                    onClick={this.onClickRecommendationRationg}
                />
            </div>
        );
    }
}