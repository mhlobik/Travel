import * as React from 'react';
import './header.scss';
import Facebook from '../../containers/facebook/facebook';
import { autobind } from 'quick-react-ts';

interface IHeaderProps {
    onGoToPreferences(shouldGo: boolean): void;
}

export default class Header extends React.PureComponent<IHeaderProps, {}> {
    @autobind
    private handleOnClick() {
        this.props.onGoToPreferences(true);
    }

    public render() {
        return (
            <div className="header__container">
                <span className="header__title">Travel</span>
                <div className="header__right">
                    <div className="header__preferences-button" onClick={this.handleOnClick}>My Preferences</div>
                    <Facebook />
                </div>
            </div>
        );
    }
}
