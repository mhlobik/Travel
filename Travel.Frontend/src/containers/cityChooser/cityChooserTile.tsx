import * as React from 'react';
import './cityChooserTile.scss';
import { autobind } from 'quick-react-ts';
import { ICity } from '../../common/city';
import * as classNames from 'classnames';

interface ICityChooserTileProps {
    city: ICity;
    onClick(cityId: string, selected: boolean): void;
}

interface ICityChooserTileState {
    selected: boolean;
}

export default class CityChooserTile extends React.PureComponent<ICityChooserTileProps, ICityChooserTileState> {
    constructor(props: ICityChooserTileProps) {
        super(props);

        this.state = {
            selected: false
        };
    }

    @autobind
    private _onHandleClick() {
        this.setState({ selected: !this.state.selected });
        this.props.onClick(this.props.city.cityId, !this.state.selected);
    }

    public render() {
        return (
            <div className={classNames('city-chooser-tile__container',
                { 'is-selected': this.state.selected })} onClick={this._onHandleClick}>
                {this.props.city.name}
            </div>
        );
    }
}