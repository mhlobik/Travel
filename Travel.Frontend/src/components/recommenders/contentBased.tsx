import * as React from 'react';
import Carousel from '../carousel/carousel';
import { IRecommendation } from '../../common/recommendationUtilities';
import './contentBased.scss';
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

interface IContentBasedProps {
    user?: IUser;
    contentBasedRecommendations?: Array<IRecommendation>;
    openRecommendedItem?: boolean;
    pointsOfInterestsInfo?: Array<ICarouselData>;
    isGettingPointsOfInterestsInfo?: boolean;
    flights?: Array<IFlightViewModel>;
    isGettingFlights?: boolean;
    isGettingContentBased?: boolean;
    selectedRecommendation?: IRecommendation;
    isGettingUserProfile?: boolean;
    handleOnItemClick?(recommendation: IRecommendation): void;
    onCloseRecommendedItem?(): void;
    onClickRecommendationRating?(rate: number): void;
}

interface IContentBasedState {
    isLoading: boolean;
}

function mapStateToProps(state: IRootReducerState): IContentBasedProps {
    return {
        user: state.facebook.user,
        contentBasedRecommendations: state.recommendation.contentBasedRecommendations,
        openRecommendedItem: state.recommendation.openRecommendedItem,
        pointsOfInterestsInfo: state.city.pointsOfInterestsInfo,
        isGettingPointsOfInterestsInfo: state.city.isGettingPointsOfInterestsInfo,
        flights: state.city.flights,
        isGettingFlights: state.city.isGettingFlights,
        isGettingContentBased: state.recommendation.isGettingContentBased,
        selectedRecommendation: state.recommendation.selectedRecommendation,
        isGettingUserProfile: state.facebook.isGettingUserProfile
    };
}

function mapDispatchToProps(dispatch: any): IContentBasedProps {
    return {
        handleOnItemClick: (recommendation: IRecommendation) => dispatch(recommendationActions.openRecommendedItem(recommendation)),
        onCloseRecommendedItem: () => dispatch(recommendationActions.closeRecommendedItem())
    };
}

function mergeProps(
    stateProps: IContentBasedProps,
    dispatchProps: IContentBasedProps
): IContentBasedProps {
    return {
        ...stateProps,
        ...dispatchProps
    };
}

class ContentBased extends React.PureComponent<IContentBasedProps, IContentBasedState> {
    constructor(props: IContentBasedProps) {
        super(props);

        this.state = {
            isLoading: false
        };
    }

    public componentWillReceiveProps(nextProps: IContentBasedProps) {
        this.setState({ isLoading: nextProps.isGettingContentBased || nextProps.isGettingUserProfile});
    }

    @autobind
    private onHandleOnItemClick(recommendation: IRecommendation) {
        this.props.handleOnItemClick(recommendation);
    }

    public render() {
        return (
            <div className="content-based__container">
                <span className="content-based__title">Cities which you may like based on your Facebook profile:</span>
                <Carousel
                    recommendations={this.props.contentBasedRecommendations}
                    handleOnItemClick={this.onHandleOnItemClick}
                    isClickable={true}
                    isLoading={this.state.isLoading}
                />

                {
                    this.props.openRecommendedItem &&
                    this.props.selectedRecommendation !== null &&
                    this.props.selectedRecommendation.recommenderModel === RecommenderModelEnum.ContentBased &&
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
)(ContentBased);