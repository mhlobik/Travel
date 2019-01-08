import * as React from 'react';
import { Spinner, QuickGrid, GridColumn, SpinnerType } from 'quick-react-ts';
import {  IHotel } from '../../common/city';
import { noHotels } from '../../assets/strings/strings';

interface ICityHotelsProps {
    hotels: Array<IHotel>;
    isGettingHotels: boolean;
    cityName: string;
}

export const hotelsColumns: Array<GridColumn> = [
    {
        valueMember: 'name',
        headerText: 'Name',
        width: 100,
        minWidth: 100
    },
    {
        valueMember: 'address',
        headerText: 'Address',
        width: 100,
        minWidth: 100
    },
    {
        valueMember: 'website',
        headerText: 'Website',
        width: 30,
        minWidth: 30,
        cellFormatter: (cellData, rowData) => {
            return (
                <a className="grid-cell_link" href={cellData}>
                    {'View website'}
                </a>
            );
        }
    },
    {
        valueMember: 'userRating',
        headerText: 'Users Rating',
        cellFormatter: (cellData, rowData) => {
            return (<div className="grid-cell__center"><div>{cellData}</div></div>);
        },
        width: 30,
        minWidth: 30
    },
    {
        valueMember: 'googleMapsUrl',
        headerText: 'Google Maps Url',
        width: 50,
        minWidth: 50,
        cellFormatter: (cellData, rowData) => {
            return (
                <a className="grid-cell_link" href={cellData}>
                    {'Open in Google Maps'}
                </a>
            );
        }
    }
];

export default class CityHotels extends React.PureComponent<ICityHotelsProps, {}> {
    public render() {
        return (
            <div className="city-hotels__container">
                <div className="city-hotels__content">
                    {this.props.isGettingHotels &&
                        <Spinner type={SpinnerType.large} className="city-hotels__spinner" label={'Loading Hotels...'} />
                    }
                    {this.props.hotels !== null && this.props.hotels.length !== 0 &&
                        <div className="city-hotels__grid">
                            <QuickGrid
                                rows={this.props.hotels}
                                columns={hotelsColumns}
                            />
                        </div>
                    }
                    {!this.props.isGettingHotels && this.props.hotels === null &&
                        <span className="city-hotels__message">{noHotels(this.props.cityName)}</span>
                    }
                </div>
            </div>
        );
    }
}