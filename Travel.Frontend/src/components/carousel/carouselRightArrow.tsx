import * as React from 'react';

interface ICarouselRightArrowProps {
    onClick(e: any): void;
}

export default class CarouselRightArrow extends React.PureComponent<ICarouselRightArrowProps, {}> {
    public render() {
        return (
            <a
                href="#"
                className="carousel__arrow carousel__arrow--right"
                onClick={this.props.onClick}
            >
                <i className="right" />
            </a>
        );
    }
}