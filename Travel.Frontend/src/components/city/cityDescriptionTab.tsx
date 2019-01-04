import * as React from 'react';

interface ICityDescriptionTabProps {
    description: string;
    imageUrl: string;
}

export default class CityDescriptionTab extends React.PureComponent<ICityDescriptionTabProps, {}> {
    public render() {
        return (
            <div className="city-description__container">
                <div className="city-description__text">{this.props.description}</div>
                <img src={this.props.imageUrl} height="350" width="350"></img>
            </div>
        );
    }
}