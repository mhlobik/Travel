import * as React from 'react';
import { ICarouselData } from '../mainContent/mainContent';

interface ICarouselSlideProps {
    key: number;
    index: number;
    activeIndex: number;
    slide: ICarouselData;
    activeIndexes: Array<number>;
}

export default class CarouselSlide extends React.PureComponent<ICarouselSlideProps, {}> {
    public render() {
        console.log('CarouselSlide', this.props.activeIndexes);
        return (
            <li
                className={
                    this.props.activeIndexes.find((i) => { return i === this.props.index; }) !== undefined
                        ? 'carousel__slide carousel__slide--active'
                        : 'carousel__slide'
                }
            >
                <p className="carousel-slide__content">{this.props.slide.content}</p>
                <p>
                    <strong className="carousel-slide__author">
                        {this.props.slide.author}
                    </strong>,
            {' '}
                    <small className="carousel-slide__source">
                        {this.props.slide.source}
                    </small>
                </p>
            </li>
        );
    }
}