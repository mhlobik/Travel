import * as React from 'react';
import { connect } from 'react-redux';
import { IRootReducerState } from '../../reducers/rootReducer';
import { facabookAppId } from './config';
import { Button, Spinner, SpinnerType } from 'quick-react-ts';
import './facebook.scss';
import * as FacebookLogo from '../../assets/images/facebook.png';
import { FacebookLoginStatusEmum } from '../../common/facebookUtilities';

interface IFacebookProps {
}

interface IFacebookState {
    userLoggedIn?: boolean;
    isLoadingStatus?: boolean;
}

function mapStateToProps(state: IRootReducerState): IFacebookProps {
    return {};
}

function mapDispatchToProps(dispatch: any): IFacebookProps {
    return {
    };
}

function mergeProps(
    stateProps: IFacebookProps,
    dispatchProps: IFacebookProps
): IFacebookProps {
    return {
        ...stateProps,
        ...dispatchProps
    };
}

class Facebook extends React.Component<IFacebookProps, IFacebookState> {
    constructor(props: IFacebookProps) {
        super(props);

        this.state = {
            userLoggedIn: false,
            isLoadingStatus: true
        };
    }

    public componentDidMount() {
        // Load the required SDK asynchronously for facebook, google and linkedin
        // tslint:disable-next-line:only-arrow-functions
        (function (d: any, s: any, id: any) {
            let js = d.getElementsByTagName(s)[0];
            const fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }

            js = d.createElement(s); js.id = id;
            js.src = '//connect.facebook.net/en_US/sdk.js';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        window.fbAsyncInit = function () {
            window.FB.init({
                appId: facabookAppId,
                cookie: true,
                xfbml: true,
                version: 'v2.8'
            });

            this.setState({ isLoadingStatus: true });
            window.FB.getLoginStatus(function (response: any) {
                this.statusChangeCallback(response);
            }.bind(this));
        }.bind(this);
    }

    private facebookLogin = () => {
        this.setState({ isLoadingStatus: true });
        window.FB.login(
            function (resp: any) {
                this.statusChangeCallback(resp);
            }.bind(this), { scope: 'public_profile' });
    }

    private facebookLogOut = () => {
        this.setState({ isLoadingStatus: true });
        window.FB.logout(
            function (resp: any) {
                this.statusChangeCallback(resp);
            }.bind(this));
    }

    private checkLoginState() {
        this.setState({ isLoadingStatus: true });
        window.FB.getLoginStatus(function (response: any) {
            console.log('checkLoginState', response);
            this.statusChangeCallback(response);
        }.bind(this));
    }

    private statusChangeCallback(response: any) {
        console.log('statusChangeCallback', response);
        if (response.status === FacebookLoginStatusEmum.connected) {
            this.setState({ userLoggedIn: true, isLoadingStatus: false });
            // Logged into your app and Facebook.
            this.fetchDataFacebook();
        } else if (response.status === FacebookLoginStatusEmum.not_authorized) {
            this.setState({ userLoggedIn: false, isLoadingStatus: false });
        } else {
            this.setState({ userLoggedIn: false, isLoadingStatus: false });
        }
    }

    private fetchDataFacebook = () => {
        // tslint:disable-next-line:only-arrow-functions
        window.FB.api('/me', function (user: any) {
            console.log('fetchDataFacebook', user);
        });
    }

    public render() {
        return (
            <div className="facebook">
                {this.state.isLoadingStatus && <Spinner type={SpinnerType.small}></Spinner>}
                {!this.state.userLoggedIn && !this.state.isLoadingStatus &&
                    <span className="facebook__button-wrapper">
                        <img src={FacebookLogo} className="facebook__logo" height="32" width="32" />
                        <button
                            className="facebook__button"
                            onClick={() => this.facebookLogin()}
                        >Login With Facebook
                    </button>
                    </span>
                }
                {this.state.userLoggedIn && !this.state.isLoadingStatus &&
                    <span className="facebook__button-wrapper">
                        <img src={FacebookLogo} className="facebook__logo" height="32" width="32" />
                        <button
                            className="facebook__button"
                            onClick={() => this.facebookLogOut()}
                        >Log Out
                    </button>
                    </span>
                }
            </div>
        );
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(Facebook);
