import * as React from 'react';
import Carousel from '../carousel/carousel';
import { IRecommendation } from '../../common/recommendationUtilities';
import './knowledgeBased.scss';
import { ICity, IPointOfInterestsCityInfo, IFlight, IFlightViewModel } from '../../common/city';
import City from '../city/city';
import { autobind, Spinner, SpinnerType } from 'quick-react-ts';
import { ICarouselData } from '../mainContent/mainContent';
import { connect } from 'react-redux';
import { IRootReducerState } from '../../reducers/rootReducer';
import * as recommendationActions from '../../action/recommendation';
import * as cityActions from '../../action/city';

interface IKnowledgeBasedProps {
    userId?: string;
    knowledgeBasedRecommendations?: Array<IRecommendation>;
    selectedRecommendedCity?: ICity;
    openRecommendedItem?: boolean;
    pointsOfInterestsInfo?: Array<ICarouselData>;
    isGettingPointsOfInterestsInfo?: boolean;
    flights?: Array<IFlightViewModel>;
    isGettingFlights?: boolean;
    isGettingKnowledgeBased?: boolean;
    handleOnItemClick?(recommendedCity: ICity): void;
    onCloseRecommendedItem?(): void;
    onClickCityRating?(cityId: string, userId: string, rate: number): void;
    onSearchClick?(departureDate: Date, returnDate: Date, city: ICity): void;
}

interface IKnowledgeBasedState {
    isLoading: boolean;
}

function mapStateToProps(state: IRootReducerState): IKnowledgeBasedProps {
    return {
        userId: state.facebook.user.userId,
        knowledgeBasedRecommendations: state.recommendation.knowledgeBasedRecommendations,
        selectedRecommendedCity: state.recommendation.selectedRecommendedCity,
        openRecommendedItem: state.recommendation.openRecommendedItem,
        pointsOfInterestsInfo: state.city.pointsOfInterestsInfo,
        isGettingPointsOfInterestsInfo: state.city.isGettingPointsOfInterestsInfo,
        flights: state.city.flights,
        isGettingFlights: state.city.isGettingFlights,
        isGettingKnowledgeBased: state.recommendation.isGettingKnowledgeBased
    };
}

function mapDispatchToProps(dispatch: any): IKnowledgeBasedProps {
    return {
        handleOnItemClick: (recommendedCity: ICity) => dispatch(recommendationActions.openRecommendedItem(recommendedCity)),
        onCloseRecommendedItem: () => dispatch(recommendationActions.closeRecommendedItem()),
        onClickCityRating: (cityId: string, userId: string, rate: number) => dispatch(cityActions.saveCityRating(cityId, userId, rate)),
        onSearchClick: (departureDate: Date, returnDate: Date, city: ICity) =>
            dispatch(cityActions.getCityFlights(departureDate, returnDate, city))
    };
}

function mergeProps(
    stateProps: IKnowledgeBasedProps,
    dispatchProps: IKnowledgeBasedProps
): IKnowledgeBasedProps {
    return {
        ...stateProps,
        ...dispatchProps
    };
}

class KnowledgeBased extends React.PureComponent<IKnowledgeBasedProps, IKnowledgeBasedState> {
    constructor(props: IKnowledgeBasedProps) {
        super(props);

        this.state = {
            isLoading: false
        };
    }

    public componentWillReceiveProps(nextProps: IKnowledgeBasedProps) {
        this.setState({ isLoading: nextProps.isGettingKnowledgeBased });
    }

    @autobind
    private onHandleOnItemClick(recommendedCity: ICity) {
        this.props.handleOnItemClick(recommendedCity);
    }

    public render() {
        return (
            <div className="knowledge-based__container">
                <span className="knowledge-based__title">Cities based on your preferences:</span>
                <Carousel
                    knowledgeBasedRecommendations={this.props.knowledgeBasedRecommendations}
                    handleOnItemClick={this.onHandleOnItemClick}
                    isClickable={true}
                    isLoading={this.state.isLoading}
                />

                {this.props.openRecommendedItem && this.props.selectedRecommendedCity !== null &&
                    <City />
                }
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(KnowledgeBased);