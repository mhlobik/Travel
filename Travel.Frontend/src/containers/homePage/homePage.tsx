import * as React from 'react';
import { connect } from 'react-redux';
import './homePage.scss';
import { autobind } from 'quick-react-ts';

import { IRootReducerState } from '../../reducers/rootReducer';

function mapStateToProps(state: IRootReducerState): IHomePageProps {
    return {
        selectedItem: 'Home'
    };
}

function mapDispatchToProps(dispatch: any): IHomePageProps {
    return {
    };
}

function mergeProps(stateProps: IHomePageProps, dispatchProps: IHomePageProps): IHomePageProps {
    return {
        ...stateProps,
        ...dispatchProps
    };
}

interface IHomePageProps {
    showHomePage?: boolean;
    selectedItem?: string;
}

class HomePage extends React.Component<IHomePageProps, {}> {
    constructor(props: IHomePageProps) {
        super(props);
    }

    @autobind
    private _renderContainer(): Array<JSX.Element> {
        const nav = null; // <Navigation key="navigation" />;
        const div = (
            <div key="container" className="main-window-container">
               Something goes here
            </div>
        );

        return [nav, div];
    }

    public render() {
        return (
            <div className="home-page__container">
                    {this._renderContainer()}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(HomePage);
