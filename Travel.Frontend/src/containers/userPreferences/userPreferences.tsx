import * as React from 'react';
import { connect } from 'react-redux';
import { IRootReducerState } from '../../reducers/rootReducer';
import './userPreferences.scss';
import { UserPreferencesStrings } from '../../assets/strings/strings';
import { IUser, IUserProfile } from '../../common/facebookUtilities';
import { autobind, Button, TextField, Tooltip, DirectionalHint, TreeDataSource, Treeview, ITreeviewItem } from 'quick-react-ts';
import Select from 'react-select';
import * as mainActions from '../../action/main';
import { preferenceChoices, checkSavedPreferences, months, monthParts } from '../../common/appDataStructures';
import { ISelection } from '../../components/city/flightDatePicker';

interface IUserPreferencesProps {
    user?: IUser;
    userProfile?: IUserProfile;
    onSaveUserPreferences?
        // tslint:disable-next-line:max-line-length
        (userPreferences: Array<string>, monthSelected: ISelection, monthPartSelected: ISelection, duration: number, maxFlightPrice: number, user: IUser): void;
    onGoToPreferences?(shouldGo: boolean): void;
}

interface IUserPreferencesState {
    maxFlightPrice: number;
    isSaving: boolean;
    userPreferenceChoices: Array<ITreeviewItem>;
    monthSelected: ISelection;
    duration: number;
    monthPartSelected: ISelection;
}

function mapStateToProps(state: IRootReducerState): IUserPreferencesProps {
    return {
        user: state.facebook.user,
        userProfile: state.facebook.userProfile
    };
}

function mapDispatchToProps(dispatch: any): IUserPreferencesProps {
    return {
        onSaveUserPreferences:
            // tslint:disable-next-line:max-line-length
            (userPreferences: Array<string>, monthSelected: ISelection, monthPartSelected: ISelection, duration: number, maxFlightPrice: number, user: IUser) =>
                // tslint:disable-next-line:max-line-length
                dispatch(mainActions.saveUserPreferences(userPreferences, monthSelected, monthPartSelected, duration, maxFlightPrice, user)),
        onGoToPreferences: (shouldGo: boolean) => dispatch(mainActions.goToPreferences(shouldGo))
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
            isSaving: false,
            userPreferenceChoices: preferenceChoices,
            monthSelected: null,
            duration: 0,
            monthPartSelected: null
        };
    }

    public componentDidMount() {
        if (this.props.userProfile.preferences !== null) {
            this.setState({
                userPreferenceChoices: checkSavedPreferences(this.props.userProfile.preferences),
                maxFlightPrice: this.props.userProfile.maxFlightPrice,
                duration: this.props.userProfile.duration,
                monthSelected: months.find((month) => this.props.userProfile.monthSelected.toString() === month.value),
                monthPartSelected: monthParts.find((month) => this.props.userProfile.monthPartSelected === month.value)
            });
        }
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

    @autobind
    private handleOnMonthClick(selection: ISelection) {
        this.setState({ monthSelected: selection });
    }

    @autobind
    private handleOnMonthPartClick(selection: ISelection) {
        this.setState({ monthPartSelected: selection });
    }

    private _renderPriceChoices(): JSX.Element {
        return (
            <div className="user-preferences__price-choices">
                <div className="user-preferences__month">
                    <Tooltip
                        content={UserPreferencesStrings.userPreferenceMonthTooltip}
                        directionalHint={DirectionalHint.rightCenter}
                    >
                        <div className="user-preferences__month-label">{UserPreferencesStrings.userPreferenceMonth}</div>
                        <Select
                            value={this.state.monthSelected}
                            onChange={this.handleOnMonthClick}
                            options={months}
                            isSearchable={true}
                        />
                    </Tooltip>
                    <div className="user-preferences__month-label">{UserPreferencesStrings.userPreferencePartOfMonth}</div>
                        <Select
                            value={this.state.monthPartSelected}
                            onChange={this.handleOnMonthPartClick}
                            options={monthParts}
                            isSearchable={true}
                        />
                </div>

                <Tooltip
                    content={UserPreferencesStrings.userPreferenceDurationTooltip}
                    directionalHint={DirectionalHint.rightCenter}
                >
                    <TextField
                        label={UserPreferencesStrings.userPreferenceDuration}
                        className="user-preferences__duration"
                        type="number"
                        value={this.state.duration.toString()}
                        onChanged={this._oDurationChange}
                        disabled={this.state.isSaving}
                        height={30}
                    />
                </Tooltip>
                <Tooltip
                    content={UserPreferencesStrings.userPreferencesMaxFlightPriceTooltip}
                    directionalHint={DirectionalHint.rightCenter}
                >
                    <TextField
                        label={UserPreferencesStrings.userPreferencesMaxFlightPrice}
                        className="max-fligt-number-input"
                        type="number"
                        value={this.state.maxFlightPrice.toString()}
                        onChanged={this._onMaxFlightPriceChange}
                        disabled={this.state.isSaving}
                        height={30}
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
    private _oDurationChange(newValue: number) {
        this.setState({ duration: newValue });
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

        // tslint:disable-next-line:max-line-length
        this.props.onSaveUserPreferences(filteredPreferences, this.state.monthSelected, this.state.monthPartSelected, this.state.duration, this.state.maxFlightPrice, this.props.user);
    }

    @autobind
    private _onCancel() {
        this.props.onGoToPreferences(false);
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
                        className="button-textual"
                        onClick={this._onCancel}>
                        Cancel
                    </Button>
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
