import * as React from 'react';
import { connect } from 'react-redux';
import { IRootReducerState } from '../../reducers/rootReducer';
import './carousel.scss';
import { autobind } from 'quick-react-ts';
import CarouselLeftArrow from '../../components/carousel/carouselLeftArrow';
import CarouselRightArrow from '../../components/carousel/carouselRightArrow';
import CarouselSlide from '../../components/carousel/carouselSlide';
import { ICarouselData } from '../mainContent/mainContent';
import { IRecommendation } from '../../common/recommendationUtilities';
import { ICity } from '../../common/city';

interface ICarouselProps {
    //slides?: Array<ICarouselData>;
    knowledgeBasedRecommendations: Array<IRecommendation>;
    handleOnItemClick(recommendedCity: ICity): void;
}

interface ICarouselState {
    activeIndexesTest: Array<number>;
}

export default class Carousel extends React.Component<ICarouselProps, ICarouselState> {
    constructor(props: ICarouselProps) {
        super(props);

        this.goToPrevSlide = this.goToPrevSlide.bind(this);
        this.goToNextSlide = this.goToNextSlide.bind(this);

        this.state = {
            activeIndexesTest: [0, 1, 2, 3, 4]
        };
    }

    @autobind
    private goToPrevSlide(e: any) {
        e.preventDefault();

        const { knowledgeBasedRecommendations } = this.props;
        const slidesLength = knowledgeBasedRecommendations.length;
        const oldActiveIndexes = this.state.activeIndexesTest;

        const setNegativeForLast = oldActiveIndexes.map((o) => {
            if (o === 0) {
                return slidesLength;
            }
            return o;
        });

        const newActiveIndexes = setNegativeForLast.map((i) => { return --i; });

        this.setState({
            activeIndexesTest: newActiveIndexes
        });
    }

    @autobind
    private goToNextSlide(e: any) {
        e.preventDefault();

        const { knowledgeBasedRecommendations } = this.props;
        const slidesLength = knowledgeBasedRecommendations.length - 1;
        const oldActiveIndexes = this.state.activeIndexesTest;

        const setNegativeForLast = oldActiveIndexes.map((o) => {
            if (o === slidesLength) {
                return -1;
            }
            return o;
        });

        const newActiveIndexes = setNegativeForLast.map((i) => { return ++i; });

        this.setState({
            activeIndexesTest: newActiveIndexes
        });
    }

    public render() {
        return (
            <div className="carousel">
                <CarouselLeftArrow onClick={this.goToPrevSlide} />

                <ul className="carousel__slides">
                    {this.props.knowledgeBasedRecommendations.map((rec, index) =>
                        <CarouselSlide
                            key={index}
                            index={index}
                            recommendedCity={rec.recommendedCity}
                            activeIndexes={this.state.activeIndexesTest}
                            onItemClick={this.props.handleOnItemClick}
                        />
                    )}
                </ul>

                <CarouselRightArrow onClick={e => this.goToNextSlide(e)} />

            </div>
        );
    }
}
