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
import { IUser } from '../../common/facebookUtilities';
import { RecommenderModelEnum } from '../../common/enums';

interface IKnowledgeBasedProps {
    user?: IUser;
    knowledgeBasedRecommendations?: Array<IRecommendation>;
    openRecommendedItem?: boolean;
    pointsOfInterestsInfo?: Array<ICarouselData>;
    isGettingPointsOfInterestsInfo?: boolean;
    flights?: Array<IFlightViewModel>;
    isGettingFlights?: boolean;
    isGettingKnowledgeBased?: boolean;
    selectedRecommendation?: IRecommendation;
    isGettingUserProfile?: boolean;
    handleOnItemClick?(recommendation: IRecommendation): void;
    onCloseRecommendedItem?(): void;
    onClickRecommendationRating?(rate: number): void;
}

interface IKnowledgeBasedState {
    isLoading: boolean;
}

function mapStateToProps(state: IRootReducerState): IKnowledgeBasedProps {
    return {
        user: state.facebook.user,
        knowledgeBasedRecommendations: state.recommendation.knowledgeBasedRecommendations,
        openRecommendedItem: state.recommendation.openRecommendedItem,
        pointsOfInterestsInfo: state.city.pointsOfInterestsInfo,
        isGettingPointsOfInterestsInfo: state.city.isGettingPointsOfInterestsInfo,
        flights: state.city.flights,
        isGettingFlights: state.city.isGettingFlights,
        isGettingKnowledgeBased: state.recommendation.isGettingKnowledgeBased,
        selectedRecommendation: state.recommendation.selectedRecommendation,
        isGettingUserProfile: state.facebook.isGettingUserProfile
    };
}

function mapDispatchToProps(dispatch: any): IKnowledgeBasedProps {
    return {
        handleOnItemClick: (recommendation: IRecommendation) => dispatch(recommendationActions.openRecommendedItem(recommendation)),
        onCloseRecommendedItem: () => dispatch(recommendationActions.closeRecommendedItem())
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
        this.setState({ isLoading: nextProps.isGettingKnowledgeBased || nextProps.isGettingUserProfile });
    }

    @autobind
    private onHandleOnItemClick(recommendation: IRecommendation) {
        this.props.handleOnItemClick(recommendation);
    }

    public render() {
        return (
            <div className="knowledge-based__container">
                <span className="knowledge-based__title">Cities based on your preferences:</span>
                <Carousel
                    recommendations={this.props.knowledgeBasedRecommendations}
                    handleOnItemClick={this.onHandleOnItemClick}
                    isClickable={true}
                    isLoading={this.state.isLoading}
                />

                {
                    this.props.openRecommendedItem &&
                    this.props.selectedRecommendation !== null &&
                    this.props.selectedRecommendation.recommenderModel === RecommenderModelEnum.KnowledgeBased &&
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