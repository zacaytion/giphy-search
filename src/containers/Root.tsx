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
import styled from 'react-emotion';
import { Header } from '../components/Header';
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
    <Div>
      <Provider store={store} key={Math.random()}>
        <ConnectedRouter history={history} key={Math.random()}>
       <div>
        <Header />
          <Switch>
            <Route exact path="/" component={Home} />
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
