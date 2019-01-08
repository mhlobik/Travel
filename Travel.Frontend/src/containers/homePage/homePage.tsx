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
import { ICity, IFlight, IFlightViewModel } from '../../common/city';

function mapStateToProps(state: IRootReducerState): IHomePageProps {
  return {
    selectedItem: 'Home',
    userLoggedIn: state.facebook.userLoggedIn,
    user: state.facebook.user,
    continueClicked: state.main.continueClicked,
    goToPreferences: state.main.goToPreferences,
    gettingUsers: state.facebook.isGettingUsers,
    userPreferencesSaved: state.main.userPreferencesSaved
  };
}

function mapDispatchToProps(dispatch: any): IHomePageProps {
  return {
    onGetAllUSers: () => dispatch(facebookActions.getUsers()),
    onGetCitiesChooser: () => dispatch(mainActions.getCitiesChooser()),
    onGoToPreferences: (shouldGo: boolean) => dispatch(mainActions.goToPreferences(shouldGo))
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
  goToPreferences?: boolean;
  onGetAllUSers?(): void;
  onGetCitiesChooser?(): void;
  onGoToPreferences?(shouldGo: boolean): void;
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

  public render() {
    return (
      <div className="home-page__container">
        <Header onGoToPreferences={this.props.onGoToPreferences} />
        <MainContent
          user={this.props.user}
          userLoggedIn={this.props.userLoggedIn}
          continueClicked={this.props.continueClicked}
          userPreferencesSaved={this.props.userPreferencesSaved}
          goToPreferences={this.props.goToPreferences}
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
