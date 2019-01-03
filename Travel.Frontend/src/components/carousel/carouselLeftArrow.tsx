import * as React from 'react';

interface ICarouselLeftArrowProps {
    onClick(e: any): void;
}

export default class CarouselLeftArrow extends React.PureComponent<ICarouselLeftArrowProps, {}> {
    public render() {
        return (
            <a
                href="#"
                className="carousel__arrow carousel__arrow--left"
                onClick={this.props.onClick}
            >
                <i className="left" />
            </a>
        );
    }
}