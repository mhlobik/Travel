import * as React from 'react';
import { connect } from 'react-redux';
import { IRootReducerState } from '../../reducers/rootReducer';
import './carousel.scss';
import { autobind } from 'quick-react-ts';
import CarouselLeftArrow from '../../components/carousel/carouselLeftArrow';
import CarouselRightArrow from '../../components/carousel/carouselRightArrow';
import CarouselSlide from '../../components/carousel/carouselSlide';
import { ICarouselData } from '../mainContent/mainContent';

interface ICarouselProps {
    slides?: Array<ICarouselData>;
}

interface ICarouselState {
    activeIndex: number;
    activeIndexesTest: Array<number>;
}

export default class Carousel extends React.Component<ICarouselProps, ICarouselState> {
    constructor(props: ICarouselProps) {
        super(props);

        this.goToSlide = this.goToSlide.bind(this);
        this.goToPrevSlide = this.goToPrevSlide.bind(this);
        this.goToNextSlide = this.goToNextSlide.bind(this);

        this.state = {
            activeIndex: 0,
            activeIndexesTest: [0, 1, 2, 3]
        };
    }

    @autobind
    private goToSlide(index: number) {
        this.setState({
            activeIndex: index
        });
    }

    @autobind
    private goToPrevSlide(e: any) {
        e.preventDefault();

        let index = this.state.activeIndex;
        const { slides } = this.props;
        const slidesLength = slides.length;
        const oldActiveIndexes = this.state.activeIndexesTest;

        const setNegativeForLast = oldActiveIndexes.map((o) => {
            if (o === 0) {
                return slidesLength;
            }
            return o;
        });

        if (index < 1) {
            index = slidesLength;
        }

        --index;

        const newActiveIndexes = setNegativeForLast.map((i) => { return --i; });

        this.setState({
            activeIndex: index,
            activeIndexesTest: newActiveIndexes
        });
    }

    @autobind
    private goToNextSlide(e: any) {
        e.preventDefault();

        let index = this.state.activeIndex;
        const { slides } = this.props;
        const slidesLength = slides.length - 1;
        const oldActiveIndexes = this.state.activeIndexesTest;

        const setNegativeForLast = oldActiveIndexes.map((o) => {
            if (o === slidesLength) {
                return -1;
            }
            return o;
        });

        if (index === slidesLength) {
            index = -1;
        }

        ++index;

        const newActiveIndexes = setNegativeForLast.map((i) => { return ++i; });

        this.setState({
            activeIndex: index,
            activeIndexesTest: newActiveIndexes
        });
    }

    public render() {
        return (
            <div className="carousel">
                <CarouselLeftArrow onClick={this.goToPrevSlide} />

                <ul className="carousel__slides">
                    {this.props.slides.map((slide, index) =>
                        <CarouselSlide
                            key={index}
                            index={index}
                            activeIndex={this.state.activeIndex}
                            slide={slide}
                            activeIndexes={this.state.activeIndexesTest}
                        />
                    )}
                </ul>

                <CarouselRightArrow onClick={e => this.goToNextSlide(e)} />

            </div>
        );
    }
}
