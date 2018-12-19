import * as React from 'react';
import { connect } from 'react-redux';
import { IRootReducerState } from '../../reducers/rootReducer';
import './userPreferences.scss';
import { UserPreferencesStrings } from '../../assets/strings/strings';
import { IUser } from '../../common/facebookUtilities';
import { autobind, Button, TextField, Tooltip, DirectionalHint, TreeDataSource, Treeview, ITreeviewItem } from 'quick-react-ts';

import * as mainActions from '../../action/main';
import { preferenceChoices } from '../../common/appDataStructures';

interface IUserPreferencesProps {
    user?: IUser;
    onSaveUserPreferences?(userPreferences: Array<string>, maxTravelPrice: number, maxFlightPrice: number, user: IUser): void;
}

interface IUserPreferencesState {
    maxFlightPrice: number;
    maxTravelPrice: number;
    isSaving: boolean;
    userPreferenceChoices: Array<ITreeviewItem>;
}

function mapStateToProps(state: IRootReducerState): IUserPreferencesProps {
    return {
        user: state.facebook.user
    };
}

function mapDispatchToProps(dispatch: any): IUserPreferencesProps {
    return {
        onSaveUserPreferences: (userPreferences: Array<string>, maxTravelPrice: number, maxFlightPrice: number, user: IUser) =>
            dispatch(mainActions.saveUserPreferences(userPreferences, maxTravelPrice, maxFlightPrice, user))
    };
}

function mergeProps(
    stateProps: IUserPreferencesProps,
    dispatchProps: IUserPreferencesProps
): IUserPreferencesProps {
    return {
        ...stateProps,
        ...dispatchProps
    };
}

class UserPreferences extends React.Component<IUserPreferencesProps, IUserPreferencesState> {
    constructor(props: IUserPreferencesProps) {
        super(props);

        this.state = {
            maxFlightPrice: 0,
            maxTravelPrice: 0,
            isSaving: false,
            userPreferenceChoices: preferenceChoices
        };
    }

    @autobind
    private _onCheckboxClicked(ev: any, itemId: Array<string>, checked: boolean) {
        const newUserPReferencesChoices = this.state.userPreferenceChoices.map((item) => {
            const change = itemId.find((i) => { return i === item.id; });
            if (change !== undefined) {
                item.checked = checked;
            }

            return item;
        });
        this.setState({ userPreferenceChoices: newUserPReferencesChoices });
    }

    private _renderPriceChoices(): JSX.Element {
        return (
            <div className="user-preferences__price-choices">
                <Tooltip
                    content={UserPreferencesStrings.userPReferencesMaxTravelPriceTooltip}
                    directionalHint={DirectionalHint.rightBottomEdge}>
                    <TextField
                        label={UserPreferencesStrings.userPReferencesMaxTravelPrice}
                        className="max-travel-number-input"
                        type="number"
                        value={this.state.maxTravelPrice.toString()}
                        onChanged={this._onMaxTravelPriceChange}
                        disabled={this.state.isSaving}
                    />
                </Tooltip>

                <Tooltip
                    content={UserPreferencesStrings.userPreferencesMaxFlightPriceTooltip}
                    directionalHint={DirectionalHint.rightCenter}>
                    <TextField
                        label={UserPreferencesStrings.userPreferencesMaxFlightPrice}
                        className="max-fligt-number-input"
                        type="number"
                        value={this.state.maxFlightPrice.toString()}
                        onChanged={this._onMaxFlightPriceChange}
                        disabled={this.state.isSaving}
                    />
                </Tooltip>
            </div >
        );
    }

    private _renderChoicesTree(): JSX.Element {
        return (
            <span>
                <Treeview
                    items={this.state.userPreferenceChoices}
                    onSelect={this._onCheckboxClicked}
                    showCheckbox={true}
                    recursive={true}
                />
            </span>
        );
    }

    @autobind
    private _onMaxFlightPriceChange(newValue: number) {
        this.setState({ maxFlightPrice: newValue });
    }

    @autobind
    private _onMaxTravelPriceChange(newValue: number) {
        this.setState({ maxTravelPrice: newValue });
    }

    @autobind
    private _onSaveClick() {
        // tslint:disable-next-line:max-line-length
        const newPreferences = this.state.userPreferenceChoices.map((choice) => {
            if (choice.checked) {
                return choice.id;
            }
        });
        const filteredPreferences = newPreferences.filter((i) => {
            if (i !== '0') {
                return i;
            }
        });

        this.props.onSaveUserPreferences(filteredPreferences, this.state.maxTravelPrice, this.state.maxFlightPrice, this.props.user);
    }

    public render() {
        return (
            <div className="user-preferences__container">
                <span className="user-preferences__title">{UserPreferencesStrings.userPreferencesTitle(this.props.user.firstName)}</span>
                <span className="user-preferences__subtitle">{UserPreferencesStrings.userPreferencesSubtitle}</span>
                {this._renderChoicesTree()}
                {this._renderPriceChoices()}
                <span className="user-preferences__button-wraper">
                    <Button
                        className="user-preferences__button"
                        onClick={this._onSaveClick}
                        width={170}
                    >Save Preferences
                </Button>
                </span>
            </div>
        );
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(UserPreferences);
