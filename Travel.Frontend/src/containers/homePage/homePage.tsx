import * as React from 'react';
import { connect } from 'react-redux';
import './homePage.scss';
import { autobind } from 'quick-react-ts';
import { IRootReducerState } from '../../reducers/rootReducer';
import Facebook from '../facebook/facebook';
import * as facebookActions from '../../action/facebook';
import { IUser } from '../../common/facebookUtilities';
import Header from '../../components/header/header';
import MainContent from '../../components/mainContent/mainContent';
import * as mainActions from '../../action/main';
import { IRecommendation } from '../../common/recommendationUtilities';

function mapStateToProps(state: IRootReducerState): IHomePageProps {
  return {
    selectedItem: 'Home',
    userLoggedIn: state.facebook.userLoggedIn,
    user: state.facebook.user,
    continueClicked: state.main.continueClicked,
    gettingUsers: state.facebook.isGettingUsers,
    userPreferencesSaved: state.main.userPreferencesSaved,
    knowledgeBasedRecommendations: state.recommendation.knowledgeBasedRecommendations
  };
}

function mapDispatchToProps(dispatch: any): IHomePageProps {
  return {
    onGetAllUSers: () => dispatch(facebookActions.getUsers()),
    onGetCitiesChooser: () => dispatch(mainActions.getCitiesChooser())
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
  onGetAllUSers?(): void;
  onGetCitiesChooser?(): void;
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
    this.props.onGetCitiesChooser();
  }

  public render() {
    return (
      <div className="home-page__container">
        <Header />
        <MainContent
          user={this.props.user}
          userLoggedIn={this.props.userLoggedIn}
          continueClicked={this.props.continueClicked}
          userPreferencesSaved={this.props.userPreferencesSaved}
          knowledgeBasedRecommendations={this.props.knowledgeBasedRecommendations}
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
