import * as React from 'react';
import * as classNames from 'classnames';
import './app.scss';
import { connect } from 'react-redux';
import { IRootReducerState } from '../../reducers/rootReducer';

function mapStateToProps(state: IRootReducerState): IAppProps {
  return {
    isHome: state.routing.locationBeforeTransitions
      ? state.routing.locationBeforeTransitions.pathname === '/'
        ? true
        : false
      : false
  };
}

function mapDispatchToProps(dispatch: any): IAppProps {
  return {

  };
}

interface IAppProps {
  isHome?: boolean;
}

class App extends React.PureComponent<IAppProps, {}> {
  constructor(props: IAppProps) {
    super(props);
  }

  public render() {
    const appWindowClass = classNames({
      'app__window-browser': true
    });

    return (
      <div className="app__container">
        <div className={appWindowClass}>{this.props.children}</div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
