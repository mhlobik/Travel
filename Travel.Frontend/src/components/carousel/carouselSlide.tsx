import * as React from 'react';
import { autobind } from 'quick-react-ts';
import { ICity } from '../../common/city';

interface ICarouselSlideProps {
    key: number;
    index: number;
    recommendedCity: ICity;
    activeIndexes: Array<number>;
    onItemClick(recommendedCity: ICity): void;
}

export default class CarouselSlide extends React.PureComponent<ICarouselSlideProps, {}> {
    @autobind
    private handleOnItemClick() {
        this.props.onItemClick(this.props.recommendedCity);
    }

    public render() {
        return (
            <li
                className={
                    this.props.activeIndexes.find((i) => { return i === this.props.index; }) !== undefined
                        ? 'carousel__slide carousel__slide--active'
                        : 'carousel__slide'
                }
                onClick={this.handleOnItemClick}
            >
                <img src={this.props.recommendedCity.imageUrl} height="298" width="298"></img>
                <span className="carousel-slide__content">
                    {this.props.recommendedCity.name}
                </span>
            </li>
        );
    }
}