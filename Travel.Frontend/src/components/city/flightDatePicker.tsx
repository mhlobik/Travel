import * as React from 'react';

import { DateTimeDropdownPicker, autobind, Button, TreeFilter, TreeItem } from 'quick-react-ts';

interface IFlightDatePickerProps {
    onSearchClick(departureDate: Date, returnDate: Date): void;
}

interface IFlightDatePickerState {
    departure: Date;
    return: Date;
}

export default class FlightDatePicker extends React.Component<IFlightDatePickerProps, IFlightDatePickerState> {
    constructor(props: IFlightDatePickerProps) {
        super(props);
        this.state = {
            departure: new Date(),
            return: new Date()
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
        this.props.onSearchClick(this.state.departure, this.state.return);
    }

    @autobind
    private handleOnOriginClick(option: any, index: any) {
        console.log('handleOnOriginClick', option, index);
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
                <TreeFilter
                    items={options}
                    itemsAreFlatList={true}
                    hasTitleBorder={true}
                    showButtons={false}
                    hasSearch={true}
                    isSingleSelect={true}
                />
            </div>
        );
    }

    private renderToCity(options: any): JSX.Element {
        return (
            <div className="flight-date-picker__picker">
                <span className="flight-date-picker__label">To</span>
                <TreeFilter
                    items={options}
                    itemsAreFlatList={true}
                    hasTitleBorder={true}
                    showButtons={false}
                    hasSearch={true}
                    isSingleSelect={true}
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
        const options: Array<TreeItem> = [
            { value: 'Swedish', id: 'sv' },
            { value: 'English', id: 'en' }
        ];

        return (
            <div className="flight-date-picker__container">
                {this.renderDepartureDatePicker()}
                {this.renderReturnDatePicker()}

                {this.renderFromCity(options)}
                {this.renderToCity(options)}

                {this.renderSearchButton()}
            </div>
        );
    }
}