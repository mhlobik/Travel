import * as React from 'react';
import './cityChooser.scss';
import { autobind, Button, IUsage } from 'quick-react-ts';
import { ICity, ICityRating } from '../../common/city';
import CityChooserTile from './cityChooserTile';
import { connect } from 'react-redux';
import { IRootReducerState } from '../../reducers/rootReducer';
import * as mainActions from '../../action/main';
import { CityChooserStrings } from '../../assets/strings/strings';
import { IUser } from '../../common/facebookUtilities';

interface ICityChooserProps {
    user?: IUser;
    cities?: Array<ICity>;
    onContinueClicked?(clicked: boolean, selectedCities: Array<ICityRating>): void;
}

interface ICityChooserState {
    selectedCities: Array<ICityRating>;
}

function mapStateToProps(state: IRootReducerState): ICityChooserProps {
    return {
        user: state.facebook.user,
        cities: state.main.citiesChooser
    };
}

function mapDispatchToProps(dispatch: any): ICityChooserProps {
    return {
        onContinueClicked: (clicked: boolean, selectedCities: Array<ICityRating>) =>
            dispatch(mainActions.selectedCities(clicked, selectedCities))
    };
}

function mergeProps(
    stateProps: ICityChooserProps,
    dispatchProps: ICityChooserProps
): ICityChooserProps {
    return {
        ...stateProps,
        ...dispatchProps
    };
}

class CityChooser extends React.PureComponent<ICityChooserProps, ICityChooserState> {
    constructor(props: ICityChooserProps) {
        super(props);

        this.state = {
            selectedCities: []
        };
    }

    @autobind
    private _onCityClicked(cityId: string, selected: boolean) {
        const newCityRating: ICityRating = { cityId: cityId, userId: this.props.user.userId, liked: selected };
        const newSelectedCities = this.state.selectedCities.concat([newCityRating]);

        this.setState({ selectedCities: newSelectedCities });
    }

    @autobind
    private _onContinueClick() {
        this.props.onContinueClicked(true, this.state.selectedCities);
    }

    private _renderContinueButton(): JSX.Element {
        return (
            <span className="city-chooser__button-wraper">
                <Button
                    className="city-chooser__button"
                    onClick={this._onContinueClick}
                    width={170}
                >Continue
                </Button>
            </span>
        );
    }

    public render() {
        return (
            <div className="city-chooser__container">
                <div className="city-chooser__header">
                    <span className="city-chooser__header-left">
                        <span className="city-chooser__title">{CityChooserStrings.cityChooserTitle(this.props.user.firstName)}</span>
                        <span className="city-chooser__subtitle">{CityChooserStrings.cityChooserSubtitle}</span>
                    </span>
                    {this._renderContinueButton()}
                </div>

                <div className="city-chooser__tiles">
                    {
                        this.props.cities.map((city) => {
                            return <CityChooserTile city={city} onClick={this._onCityClicked} />;
                        })
                    }
                </div>
            </div >
        );
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(CityChooser);
