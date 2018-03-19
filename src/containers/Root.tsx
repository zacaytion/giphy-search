/* tslint:disable:ordered-imports */
import { hot } from 'react-hot-loader'; // Must Come Before React!!!!!!
import * as React from 'react';
import styled from 'react-emotion';
import { connect, Provider } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import { Store } from 'redux';
import { History } from 'history';
import { AutoComplete } from './AutoComplete';
import { About, NotFound, Header } from '../components';
import { trendingGIFs, TTrendingGIFs } from '../state/actionCreators';
import { IAppState } from '../state/initial';

const Div = styled.div({
  margin: '0px auto',
  width: '100%',
});

interface IProps {
  store: Store<IAppState>;
  history: History;
}
interface IStateProps {
  error: Error | null;
}

/**
 * Root Component
 *
 *
 * @class RootComponent
 * @extends {React.Component<IProps, IStateProps>}
 */
class RootComponent extends React.Component<IProps, IStateProps> {
  public state = {
    error: null,
  };

  /**
   * When the Root component mounts, fetch trending gifs
   *
   * @memberof RootComponent
   */
  public componentWillMount() {
    const { store } = this.props;
    store.dispatch(trendingGIFs());
  }

  /**
   * If for some reason an error appears, pass it to redux
   *
   * @param {Error} error
   * @memberof RootComponent
   */
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
    <Div>
      <Provider store={store} key={Math.random()}>
        <ConnectedRouter history={history} key={Math.random()}>
          <div>
            <Header />
            <Switch>
              <Route exact path="/" component={AutoComplete} />
              <Route path="/about" component={About} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </ConnectedRouter>
      </Provider>
    </Div>
    );
  }
}

const Root = connect<{}, {}>(null, {
})(RootComponent);

export default hot(module)(Root);
