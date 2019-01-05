import * as React from 'react';
import { connect } from 'react-redux';
import './homePage.scss';
import { autobind } from 'quick-react-ts';
import { IRootReducerState } from '../../reducers/rootReducer';
import * as facebookActions from '../../action/facebook';
import * as mainActions from '../../action/main';
import * as recommendationActions from '../../action/recommendation';
import * as cityActions from '../../action/city';
import { IUser } from '../../common/facebookUtilities';
import Header from '../../components/header/header';
import MainContent, { ICarouselData } from '../../components/mainContent/mainContent';
import { IRecommendation } from '../../common/recommendationUtilities';
import { ICity } from '../../common/city';

function mapStateToProps(state: IRootReducerState): IHomePageProps {
  return {
    selectedItem: 'Home',
    userLoggedIn: state.facebook.userLoggedIn,
    user: state.facebook.user,
    continueClicked: state.main.continueClicked,
    goToPreferences: state.main.goToPreferences,
    gettingUsers: state.facebook.isGettingUsers,
    userPreferencesSaved: state.main.userPreferencesSaved,
    knowledgeBasedRecommendations: state.recommendation.knowledgeBasedRecommendations,
    selectedRecommendedCity: state.recommendation.selectedRecommendedCity,
    openRecommendedItem: state.recommendation.openRecommendedItem,
    pointsOfInterestsInfo: state.city.pointsOfInterestsInfo,
    isGettingPointsOfInterestsInfo: state.city.isGettingPointsOfInterestsInfo
  };
}

function mapDispatchToProps(dispatch: any): IHomePageProps {
  return {
    onGetAllUSers: () => dispatch(facebookActions.getUsers()),
    onGetCitiesChooser: () => dispatch(mainActions.getCitiesChooser()),
    handleOnItemClick: (recommendedCity: ICity) => dispatch(recommendationActions.openRecommendedItem(recommendedCity)),
    onCloseRecommendedItem: () => dispatch(recommendationActions.closeRecommendedItem()),
    onGoToPreferences: () => dispatch(mainActions.goToPreferences()),
    onClickCityRating: (cityId: string, userId: string, rate: number) => dispatch(cityActions.saveCityRating(cityId, userId, rate))
  };
}

function mergeProps(
  stateProps: IHomePageProps,
  dispatchProps: IHomePageProps
): IHomePageProps {
  return {
    ...stateProps,
    ...dispatchProps
  };
}

interface IHomePageProps {
  showHomePage?: boolean;
  selectedItem?: string;
  userLoggedIn?: boolean;
  user?: IUser;
  continueClicked?: boolean;
  gettingUsers?: boolean;
  userPreferencesSaved?: boolean;
  knowledgeBasedRecommendations?: Array<IRecommendation>;
  selectedRecommendedCity?: ICity;
  openRecommendedItem?: boolean;
  pointsOfInterestsInfo?: Array<ICarouselData>;
  isGettingPointsOfInterestsInfo?: boolean;
  goToPreferences?: boolean;
  onGetAllUSers?(): void;
  onGetCitiesChooser?(): void;
  handleOnItemClick?(recommendedCity: ICity): void;
  onCloseRecommendedItem?(): void;
  onGoToPreferences?(): void;
  onClickCityRating?(cityId: string, userId: string, rate: number): void;
}

interface IHomePageState {
  removeFbButton?: boolean;
}

class HomePage extends React.Component<IHomePageProps, IHomePageState> {
  constructor(props: IHomePageProps) {
    super(props);

    this.state = {
      removeFbButton: false
    };
  }

  public componentDidMount() {
    this.props.onGetAllUSers();
    // this.props.onGetCitiesChooser();
  }

  @autobind
  private onHandleOnItemClick(recommendedCity: ICity) {
    this.props.handleOnItemClick(recommendedCity);
  }

  @autobind
  private handleOnCloseRecommendedItem() {
    this.props.onCloseRecommendedItem();
  }

  @autobind
  private handleOnGoToPreferences() {
    this.props.onGoToPreferences();
  }

  public render() {
    return (
      <div className="home-page__container">
        <Header onGoToPreferences={this.handleOnGoToPreferences} />
        <MainContent
          user={this.props.user}
          userLoggedIn={this.props.userLoggedIn}
          continueClicked={this.props.continueClicked}
          userPreferencesSaved={this.props.userPreferencesSaved}
          knowledgeBasedRecommendations={this.props.knowledgeBasedRecommendations}
          handleOnItemClick={this.onHandleOnItemClick}
          openRecommendedItem={this.props.openRecommendedItem}
          selectedRecommendedCity={this.props.selectedRecommendedCity}
          onCloseRecommendedItem={this.handleOnCloseRecommendedItem}
          pointsOfInterestsInfo={this.props.pointsOfInterestsInfo}
          isGettingPointsOfInterestsInfo={this.props.isGettingPointsOfInterestsInfo}
          goToPreferences={this.props.goToPreferences}
          onClickCityRating={this.props.onClickCityRating}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(HomePage);
