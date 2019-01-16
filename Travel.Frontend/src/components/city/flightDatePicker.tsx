import * as React from 'react';

import { DateTimeDropdownPicker, autobind, Button, TreeFilter, TreeItem, IFilterSelection, FilterSelectionEnum } from 'quick-react-ts';
import { IAirport } from '../../common/city';
import Select from 'react-select';

interface IFlightDatePickerProps {
    airports: Array<IAirport>;
    userLocation: string;
    cityName: string;
    onSearchClick(departureDate: Date, returnDate: Date, originSelected: string, destinationSelected: string): void;
}

interface IFlightDatePickerState {
    departure: Date;
    return: Date;
    originSelected: ISelection;
    destinationSelected: ISelection;
}

interface ISelection {
    value: string;
    label: string;
}

export default class FlightDatePicker extends React.Component<IFlightDatePickerProps, IFlightDatePickerState> {
    constructor(props: IFlightDatePickerProps) {
        super(props);
        this.state = {
            departure: new Date(),
            return: new Date(),
            originSelected: {
                value: props.userLocation,
                label: props.userLocation
            },
            destinationSelected: {
                value: props.cityName,
                label: props.cityName
            }
        };
    }

    @autobind
    private handleFromDateChange(date: Date) {
        this.setState({
            departure: date
        });
    }

    @autobind
    private handleToDateChange(date: Date) {
        this.setState({
            return: date
        });
    }

    @autobind
    private handleOnSearchClick() {
        this.props.onSearchClick(this.state.departure, this.state.return,
            this.state.originSelected.value, this.state.destinationSelected.value);
    }

    @autobind
    private handleOnOriginClick(selection: ISelection) {
        this.setState({ originSelected: selection });
    }

    @autobind
    private handleOnDestinationClick(selection: ISelection) {
        this.setState({ destinationSelected: selection });
    }

    private renderDepartureDatePicker(): JSX.Element {
        return (
            <div className="flight-date-picker__picker">
                <span className="flight-date-picker__label">Departure</span>
                <DateTimeDropdownPicker
                    selectedDate={this.state.departure}
                    onTimeSelectionChanged={this.handleFromDateChange}
                ></DateTimeDropdownPicker>
            </div>
        );
    }

    private renderReturnDatePicker(): JSX.Element {
        return (
            <div className="flight-date-picker__picker">
                <span className="flight-date-picker__label">Return</span>
                <DateTimeDropdownPicker
                    selectedDate={this.state.return}
                    onTimeSelectionChanged={this.handleToDateChange}
                ></DateTimeDropdownPicker>
            </div>
        );
    }

    private renderFromCity(options: any): JSX.Element {
        return (
            <div className="flight-date-picker__picker">
                <span className="flight-date-picker__label">From</span>
                <Select
                    value={this.state.originSelected}
                    onChange={this.handleOnOriginClick}
                    options={options}
                    isSearchable={true}
                />
            </div>
        );
    }

    private renderToCity(options: any): JSX.Element {
        return (
            <div className="flight-date-picker__picker">
                <span className="flight-date-picker__label">To</span>
                <Select
                    value={this.state.destinationSelected}
                    onChange={this.handleOnDestinationClick}
                    options={options}
                    isSearchable={true}
                />
            </div>
        );
    }

    private renderSearchButton(): JSX.Element {
        return (
            <Button
                className="flight-date-picker__button"
                onClick={this.handleOnSearchClick}
                width={150}
            >Search Flights</Button>
        );
    }

    public render() {
        const options = this.props.airports.map((data) => {
            const result: ISelection = {
                label: data.city,
                value: data.iata
            };
            return result;
        });

        return (
            <div className="flight-date-picker__container">
                <div className="flight-date-picker__cities">
                    {this.renderFromCity(options)}
                    {this.renderToCity(options)}
                </div>

                <div className="flight-date-picker__dates">
                    {this.renderDepartureDatePicker()}
                    {this.renderReturnDatePicker()}

                    {this.renderSearchButton()}
                </div>
            </div>
        );
    }
}