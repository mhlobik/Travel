import * as React from 'react';

interface ICityDescriptionTabProps {
    cityName: string;
    description: string;
    imageUrl: string;
}

export default class CityDescriptionTab extends React.PureComponent<ICityDescriptionTabProps, {}> {
    public render() {
        return (
            <div className="city-description__container">
                <div className="city-description__content">
                    <span className="city-description__title">{this.props.cityName}</span>
                    <span className="city-description__text">{this.props.description}</span>
                </div>
                <img src={this.props.imageUrl} height="350" width="350"></img>
            </div>
        );
    }
}