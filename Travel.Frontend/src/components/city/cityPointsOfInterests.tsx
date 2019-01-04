import * as React from 'react';

interface ICityPointsOfInterestsProps {
    imageUrl?: string;
    onGetPointOfInterestsImageUrl(name: string): void;
}

export default class CityPointsOfInterests extends React.PureComponent<ICityPointsOfInterestsProps, {}> {
    public componentDidMount() {
        this.props.onGetPointOfInterestsImageUrl('La Poterne caen');
      }

          public render() {
        return (
            <div className="city-points-of-interests__container">
                <img
                     ></img>
            </div>
        );
    }
}