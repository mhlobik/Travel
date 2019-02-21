import * as React from 'react';
import { Spinner, QuickGrid, SpinnerType } from 'quick-react-ts';
import { ICity } from '../../common/city';
import { noFlights } from '../../assets/strings/strings';
import { flightsColumns } from './cityFlights';
import './recommendedForYou.scss';
import { hotelsColumns } from './cityHotels';

interface IRecommendedForYouProps {
    specificRecommendation: ICity;
    isGettingSpecificRecommendation: boolean;
    userName: string;
    userLocationName: string;
}

export default class RecommendedForYou extends React.PureComponent<IRecommendedForYouProps, {}> {

    private renderContent(): JSX.Element {
        return (
            <div className="recommended-for-you__content">
                <div className="recommended-for-you__title">
                    Recommended flights from {this.props.userLocationName} to {this.props.specificRecommendation.name}
                </div>

                <div className="recommended-for-you__grid">
                    <QuickGrid
                        rows={this.props.specificRecommendation.flights}
                        columns={flightsColumns}
                    />
                </div>

                <div className="recommended-for-you__title">Recommended hotels in {this.props.specificRecommendation.name}</div>
                <div className="recommended-for-you__grid">
                    <QuickGrid
                        rows={this.props.specificRecommendation.hotels}
                        columns={hotelsColumns}
                    />
                </div>
            </div>
        );
    }
    public render() {
        console.log(this.props.isGettingSpecificRecommendation);
        return (
            <div className="recommended-for-you__container">
                <div className="recommended-for-you__message">
                    {this.props.userName}, we prepared specific recommendation of flights and hotels for you
                 </div>
                {this.props.isGettingSpecificRecommendation &&
                    <Spinner type={SpinnerType.large} className="recommended-for-you__spinner" label={'Loading...'} />
                }

                {this.props.specificRecommendation !== null && this.props.specificRecommendation.flights.length !== 0 &&
                    this.renderContent()}
            </div>
        );
    }
}