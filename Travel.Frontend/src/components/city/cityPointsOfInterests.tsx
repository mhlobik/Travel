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
                    src={'https://maps.googleapis.com/maps/api/place/photo?photoreference=CmRaAAAAaDf2diztTfrOwWYoVecGqqDnLsrta90c069MQn9ftn4B-PFzS_M2yfhxOHEWn9lbrHoydjmLJC9Jbxd7v3NNwpzsI1EKkv02xJQCYKqrGPtH4QI94eIneK3DjbYKd5DyEhBALs_oJmrZngP8ktBRAcesGhSwpGTZy4uXCdL14kOprMhODPpj5g&sensor=false&maxheight=1960&maxwidth=4032&key=AIzaSyCsvdgvlSjZbK0NWLDA-lqi8pTTi5Ux_mw'}
                     ></img>
            </div>
        );
    }
}