import * as React from 'react';
import { connect } from 'react-redux';
import './homePage.scss';
import { autobind } from 'quick-react-ts';
import * as fb from 'fb';

import { IRootReducerState } from '../../reducers/rootReducer';

function mapStateToProps(state: IRootReducerState): IHomePageProps {
  return {
    selectedItem: 'Home'
  };
}

function mapDispatchToProps(dispatch: any): IHomePageProps {
  return {};
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
}

class HomePage extends React.Component<IHomePageProps, {}> {
  constructor(props: IHomePageProps) {
    super(props);
  }
  public componentDidMount() {
    
    (window as any).fbAsyncInit = function () {
      FB.init({
        appId: '',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v2.11'
      });

      window.FB.Event.subscribe('auth.statusChange', (response: any) => {
        if (response.authResponse) {
          this.updateLoggedInState(response);
        } else {
          this.updateLoggedOutState();
        }
      });
    }.bind(this);

    // tslint:disable-next-line:only-arrow-functions
    (function (d: any, s: any, id: any) {
      let js = d.getElementsByTagName(s)[0];
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }

  private handleClick() {
    console.log('clicked');
  }
  
  @autobind
  private _renderContainer(): Array<JSX.Element> {
    const nav = null; // <Navigation key="navigation" />;
    const div = (
      <div key="container" className="main-window-container">
        Something goes here
        <a href="#" onClick={this.handleClick}>Login</a>
      </div>
    );

    return [nav, div];
  }

  public render() {
    return (
      <div className="home-page__container">{this._renderContainer()}</div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(HomePage);
