/* tslint:disable:ordered-imports */
import { History } from 'history';
import { hot } from 'react-hot-loader'; // Must Come Before React!!!!!!
import * as React from 'react';
import { connect, Provider } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import { Store } from 'redux';
import { About, NotFound } from '../components';
import { Home } from '../containers/Home';
import { trendingGIFs, TTrendingGIFs } from '../state/actionCreators';
import { IAppState } from '../state/initial';

interface IProps {
  store: Store<IAppState>;
  history: History;
}
interface IStateProps {
  error: Error | null;
}

class RootComponent extends React.Component<IProps, IStateProps> {
  public state = {
    error: null,
  };

  public componentWillMount() {
    const { store } = this.props;
    store.dispatch(trendingGIFs());
  }
  public componentDidCatch(error: Error) {
    this.setState({ error });
  }

  public render() {
    const { store, history } = this.props;
    const { error } = this.state;

    if (error) {
      return (
        <div>
          <p>{error}</p>
        </div>
      );
    }

    return (
      <Provider store={store} key={Math.random()}>
        <ConnectedRouter history={history} key={Math.random()}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route component={NotFound} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}

const Root = connect<{}, {}>(null, {
})(RootComponent);

export default hot(module)(Root);
