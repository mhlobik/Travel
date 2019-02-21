import * as React from 'react';
import { Spinner, QuickGrid, GridColumn, DataTypeEnum, SpinnerType } from 'quick-react-ts';
import FlightDatePicker from './flightDatePicker';
import { IFlightViewModel, IAirport } from '../../common/city';
import { noFlights } from '../../assets/strings/strings';
import './cityFlights.scss';

interface ICityFlightsProps {
    flights: Array<IFlightViewModel>;
    isGettingFlights: boolean;
    airports: Array<IAirport>;
    userLocation: string;
    cityName: string;
    onSearchClick(departureDate: Date, returnDate: Date, originSelected: string, destinationSelected: string): void;
}

export const flightsColumns: Array<GridColumn> = [
    {
        valueMember: 'from',
        headerText: 'From',
        width: 100,
        minWidth: 100
    },
    {
        valueMember: 'to',
        headerText: 'To',
        width: 100,
        minWidth: 100
    },
    {
        valueMember: 'totalPrice',
        headerText: 'Price',
        dataType: DataTypeEnum.Number,
        width: 50,
        minWidth: 50
    },
    {
        valueMember: 'currency',
        headerText: 'Currency',
        width: 50,
        minWidth: 50
    },
    {
        valueMember: 'outboundDuration',
        headerText: 'Outbound Duration',
        width: 50,
        minWidth: 50
    },
    {
        valueMember: 'inboundDuration',
        headerText: 'Inbound Duration',
        width: 50,
        minWidth: 50
    },
    {
        valueMember: 'link',
        headerText: 'Link',
        width: 200,
        minWidth: 100,
        cellFormatter: (cellData, rowData) => {
            return (
                <a className="grid-cell_link" href={cellData}>
                    {'Check Flight Details'}
                </a>
            );
        }
    }
];

export default class CityFlights extends React.PureComponent<ICityFlightsProps, {}> {
    public render() {
        return (
            <div className="city-flights__container">
                <FlightDatePicker
                    onSearchClick={this.props.onSearchClick}
                    airports={this.props.airports}
                    cityName={this.props.cityName}
                    userLocation={this.props.userLocation}
                />

                <div className="city-flights__content">
                    {this.props.isGettingFlights &&
                        <Spinner type={SpinnerType.large} className="city-flights__spinner" label={'Loading Flights...'} />
                    }
                    {this.props.flights !== null && this.props.flights.length !== 0 &&
                        <div className="city-flights__grid">
                            <QuickGrid
                                rows={this.props.flights}
                                columns={flightsColumns}
                            />
                        </div>
                    }
                    {!this.props.isGettingFlights && this.props.flights !== null && this.props.flights.length === 0 &&
                        // tslint:disable-next-line:max-line-length
                        <span className="city-flights__message">{noFlights}</span>
                    }
                </div>
            </div>
        );
    }
}