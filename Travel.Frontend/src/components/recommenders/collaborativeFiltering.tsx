import * as React from 'react';
import Carousel from '../carousel/carousel';
import { IRecommendation } from '../../common/recommendationUtilities';
import './collaborativeFiltering.scss';
import { ICity, IPointOfInterestsCityInfo, IFlight, IFlightViewModel } from '../../common/city';
import City from '../city/city';
import { autobind, Spinner, SpinnerType } from 'quick-react-ts';
import { ICarouselData } from '../mainContent/mainContent';
import { connect } from 'react-redux';
import { IRootReducerState } from '../../reducers/rootReducer';
import * as recommendationActions from '../../action/recommendation';
import * as cityActions from '../../action/city';
import { IUser } from '../../common/facebookUtilities';
import { RecommenderModelEnum } from '../../common/enums';

interface ICollaborativeFilteringProps {
    user?: IUser;
    collaborativeFilteringRecommendations?: Array<IRecommendation>;
    openRecommendedItem?: boolean;
    pointsOfInterestsInfo?: Array<ICarouselData>;
    isGettingPointsOfInterestsInfo?: boolean;
    flights?: Array<IFlightViewModel>;
    isGettingFlights?: boolean;
    isGettingCollaborativeFiltering?: boolean;
    selectedRecommendation?: IRecommendation;
    handleOnItemClick?(recommendation: IRecommendation): void;
    onCloseRecommendedItem?(): void;
    onClickRecommendationRating?(rate: number): void;
}

interface ICollaborativeFilteringState {
    isLoading: boolean;
}

function mapStateToProps(state: IRootReducerState): ICollaborativeFilteringProps {
    return {
        user: state.facebook.user,
        collaborativeFilteringRecommendations: state.recommendation.collaborativeFilteringRecommendations,
        openRecommendedItem: state.recommendation.openRecommendedItem,
        pointsOfInterestsInfo: state.city.pointsOfInterestsInfo,
        isGettingPointsOfInterestsInfo: state.city.isGettingPointsOfInterestsInfo,
        flights: state.city.flights,
        isGettingFlights: state.city.isGettingFlights,
        isGettingCollaborativeFiltering: state.recommendation.isGettingCollaborativeFiltering,
        selectedRecommendation: state.recommendation.selectedRecommendation
    };
}

function mapDispatchToProps(dispatch: any): ICollaborativeFilteringProps {
    return {
        handleOnItemClick: (recommendation: IRecommendation) => dispatch(recommendationActions.openRecommendedItem(recommendation)),
        onCloseRecommendedItem: () => dispatch(recommendationActions.closeRecommendedItem())
    };
}

function mergeProps(
    stateProps: ICollaborativeFilteringProps,
    dispatchProps: ICollaborativeFilteringProps
): ICollaborativeFilteringProps {
    return {
        ...stateProps,
        ...dispatchProps
    };
}

class CollaborativeFiltering extends React.PureComponent<ICollaborativeFilteringProps, ICollaborativeFilteringState> {
    constructor(props: ICollaborativeFilteringProps) {
        super(props);

        this.state = {
            isLoading: false
        };
    }

    public componentWillReceiveProps(nextProps: ICollaborativeFilteringProps) {
        this.setState({ isLoading: nextProps.isGettingCollaborativeFiltering });
    }

    @autobind
    private onHandleOnItemClick(recommendation: IRecommendation) {
        this.props.handleOnItemClick(recommendation);
    }

    public render() {
        return (
            <div className="collaborative-filtering__container">
                <span className="collaboratiove-filtering__title">Cities based on what other users liked:</span>
                <Carousel
                    recommendations={this.props.collaborativeFilteringRecommendations}
                    handleOnItemClick={this.onHandleOnItemClick}
                    isClickable={true}
                    isLoading={this.state.isLoading}
                />

                {
                    this.props.openRecommendedItem &&
                    this.props.selectedRecommendation !== null &&
                    this.props.selectedRecommendation.recommenderModel === RecommenderModelEnum.CollaborativeFiltering &&
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
)(CollaborativeFiltering);