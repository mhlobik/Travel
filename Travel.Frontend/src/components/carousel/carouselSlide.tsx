import * as React from 'react';
import { autobind } from 'quick-react-ts';
import { ICity } from '../../common/city';

interface ICarouselSlideProps {
    key: number;
    index: number;
    recommendedCity?: ICity;
    activeIndexes: Array<number>;
    image?: string;
    title?: string;
    isClickable: boolean;
    onItemClick?(recommendedCity: ICity): void;
}

export default class CarouselSlide extends React.PureComponent<ICarouselSlideProps, {}> {
    @autobind
    private handleOnItemClick() {
        this.props.onItemClick(this.props.recommendedCity);
    }

    @autobind
    private renderClickableSlide(): JSX.Element {
        return (
            <li
                className={
                    this.props.activeIndexes.find((i) => { return i === this.props.index; }) !== undefined
                        ? 'carousel__slide carousel__slide--active'
                        : 'carousel__slide'
                }
                onClick={this.handleOnItemClick}
            >
                <img src={this.props.recommendedCity.imageUrl} height="306" width="306"></img>
                <span className="carousel-slide__content">
                    {this.props.recommendedCity.name}
                </span>
            </li>
        );
    }

    @autobind
    private renderNonClickableSlide(): JSX.Element {
        return (
            <li
                className={
                    this.props.activeIndexes.find((i) => { return i === this.props.index; }) !== undefined
                        ? 'carousel__slide-non-clickable carousel-non-clickable__slide--active'
                        : 'carousel__slide'
                }
            >
                <img src={this.props.image} height="306" width="306"></img>
                <span className="carousel-slide__content">
                    {this.props.title}
                </span>
            </li>
        );
    }

    public render() {
        return (
            <div>
                {this.props.isClickable &&
                    this.renderClickableSlide()
                }
                {!this.props.isClickable &&
                    this.renderNonClickableSlide()
                }
            </div>
        );
    }
}