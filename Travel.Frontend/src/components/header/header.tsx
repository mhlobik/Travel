import * as React from 'react';
import './header.scss';
import Facebook from '../../containers/facebook/facebook';

interface IHeaderProps {

}

export default class Header extends React.PureComponent<IHeaderProps, {}> {
    public render() {
        return (
            <div className="header__container">
                <span className="header__title">Travel</span>
                <Facebook />
            </div>
        );
    }
}
