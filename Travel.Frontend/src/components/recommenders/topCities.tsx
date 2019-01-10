import * as React from 'react';
import Carousel from '../carousel/carousel';
import { IRecommendation } from '../../common/recommendationUtilities';
import './topCities.scss';
import { IFlightViewModel } from '../../common/city';
import City from '../city/city';
import { autobind, Spinner, SpinnerType } from 'quick-react-ts';
import { ICarouselData } from '../mainContent/mainContent';
import { connect } from 'react-redux';
import { IRootReducerState } from '../../reducers/rootReducer';
import * as recommendationActions from '../../action/recommendation';
import * as cityActions from '../../action/city';

interface ITopCitiesProps {
    topCitiesRecommendations?: Array<IRecommendation>;
    openRecommendedItem?: boolean;
    pointsOfInterestsInfo?: Array<ICarouselData>;
    isGettingPointsOfInterestsInfo?: boolean;
    flights?: Array<IFlightViewModel>;
    isGettingFlights?: boolean;
    isGettingTopCities?: boolean;
    selectedRecommendation?: IRecommendation;
    handleOnItemClick?(recommendation: IRecommendation): void;
    onCloseRecommendedItem?(): void;
    onClickRecommendationRating?(rate: number): void;
}

interface ITopCitiesState {
    isLoading: boolean;
}

function mapStateToProps(state: IRootReducerState): ITopCitiesProps {
    return {
        topCitiesRecommendations: state.recommendation.topCitiesRecommendations,
        openRecommendedItem: state.recommendation.openRecommendedItem,
        pointsOfInterestsInfo: state.city.pointsOfInterestsInfo,
        isGettingPointsOfInterestsInfo: state.city.isGettingPointsOfInterestsInfo,
        flights: state.city.flights,
        isGettingFlights: state.city.isGettingFlights,
        isGettingTopCities: state.recommendation.isGettingTopCities,
        selectedRecommendation: state.recommendation.selectedRecommendation
    };
}

function mapDispatchToProps(dispatch: any): ITopCitiesProps {
    return {
        handleOnItemClick: (recommendation: IRecommendation) => dispatch(recommendationActions.openRecommendedItem(recommendation)),
        onCloseRecommendedItem: () => dispatch(recommendationActions.closeRecommendedItem())
    };
}

function mergeProps(
    stateProps: ITopCitiesProps,
    dispatchProps: ITopCitiesProps
): ITopCitiesProps {
    return {
        ...stateProps,
        ...dispatchProps
    };
}

class TopCities extends React.PureComponent<ITopCitiesProps, ITopCitiesState> {
    constructor(props: ITopCitiesProps) {
        super(props);

        this.state = {
            isLoading: false
        };
    }

    public componentWillReceiveProps(nextProps: ITopCitiesProps) {
        this.setState({ isLoading: nextProps.isGettingTopCities });
    }

    @autobind
    private onHandleOnItemClick(recommendation: IRecommendation) {
        this.props.handleOnItemClick(recommendation);
    }

    public render() {
        return (
            <div className="top-cities__container">
                <span className="top-cities__title">Top Rated Cities on Travel:</span>
                <Carousel
                    recommendations={this.props.topCitiesRecommendations}
                    handleOnItemClick={this.onHandleOnItemClick}
                    isClickable={true}
                    isLoading={this.state.isLoading}
                />

                {this.props.openRecommendedItem && this.props.selectedRecommendation !== null &&
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
)(TopCities);