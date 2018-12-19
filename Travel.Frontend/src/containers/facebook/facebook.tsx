import * as React from 'react';
import { connect } from 'react-redux';
import { IRootReducerState } from '../../reducers/rootReducer';
import { facabookAppId } from './config';
import { Button, Spinner, SpinnerType } from 'quick-react-ts';
import './facebook.scss';
import * as FacebookLogo from '../../assets/images/facebook.png';
import * as FacebookUtilities from '../../common/facebookUtilities';
import * as facebookActions from '../../action/facebook';

interface IFacebookProps {
    allUsers?: Array<FacebookUtilities.IUser>;
    onManageUserFacebookData?(user: FacebookUtilities.IUser, userProfile: FacebookUtilities.IUserProfile): void;
    onMarkIsUserExists?(userExists: boolean, loggedIn: boolean, user: FacebookUtilities.IUser): void;
}

interface IFacebookState {
    userLoggedIn?: boolean;
    isLoadingStatus?: boolean;
    userProfile?: FacebookUtilities.IUserProfile;
    user?: FacebookUtilities.IUser;
}

function mapStateToProps(state: IRootReducerState): IFacebookProps {
    return {
        allUsers: state.facebook.allUsers
    };
}

function mapDispatchToProps(dispatch: any): IFacebookProps {
    return {
        onManageUserFacebookData: (user: FacebookUtilities.IUser, userProfile: FacebookUtilities.IUserProfile) =>
            dispatch(facebookActions.manageUserFacebookData(user, userProfile)),
        onMarkIsUserExists: (userExists: boolean, loggedIn: boolean, user: FacebookUtilities.IUser) =>
            dispatch(facebookActions.markIsUserExists(userExists, loggedIn, user))
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
            isLoadingStatus: true,
            userProfile: null,
            user: null
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
            }.bind(this), { scope: 'public_profile,user_friends,user_likes,user_posts,user_events,user_tagged_places' });
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
            this.statusChangeCallback(response);
        }.bind(this));
    }

    private statusChangeCallback(response: any) {
        if (response.status === FacebookUtilities.FacebookLoginStatusEmum.connected) {
            this.setState({ userLoggedIn: true, isLoadingStatus: false });
            // Logged into your app and Facebook.
            this.fetchDataFacebook();
        } else if (response.status === FacebookUtilities.FacebookLoginStatusEmum.not_authorized) {
            this.setState({ userLoggedIn: false, isLoadingStatus: false });
        } else {
            this.setState({ userLoggedIn: false, isLoadingStatus: false });
        }
    }

    private fetchDataFacebook = () => {
        // tslint:disable-next-line:only-arrow-functions
        window.FB.api('/me?fields=id,name,likes,groups,tagged_places,posts,events,email,first_name,last_name', (response: any) => {
            const userEvents = FacebookUtilities.mapResponseToIFacebookEvent(response.events);
            const userLikes = FacebookUtilities.mapResponseToIFacebookLike(response.likes);
            const userGroups = FacebookUtilities.mapResponseToIFacebookGroup(response.groups);
            const userTaggedPlaces = FacebookUtilities.mapResponseToIFacebookTaggedPlace(response.tagged_places);

            this.setState({
                userProfile: {
                    userId: response.id,
                    facebookEvents: userEvents,
                    facebookGroups: userGroups,
                    facebookLikes: userLikes,
                    facebookTaggedPlaces: userTaggedPlaces
                },
                user: {
                    email: response.email,
                    firstName: response.first_name,
                    lastName: response.last_name,
                    userId: response.id
                }
            });
            this.onHandleFacebookData();
        });
    }

    private onHandleFacebookData() {
        const userExist = this.props.allUsers.find((user) => user.userId === this.state.user.userId);

        if (!userExist) {
            this.props.onManageUserFacebookData(this.state.user, this.state.userProfile);
        }

        this.props.onMarkIsUserExists(userExist !== null, this.state.userLoggedIn, this.state.user);
    }

    public render() {
        return (
            <div
                className="fb-login-button"
                data-width="200"
                data-max-rows="1"
                data-size="large"
                data-button-type="login_with"
                data-show-faces="false"
                data-auto-logout-link="true"
                data-use-continue-as="true"
            >
            </div>

        );
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(Facebook);
