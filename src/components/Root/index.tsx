import * as React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import App from '../../containers/App';

interface IRootProps {
  store: any;
  history: any;
}
export const Root: React.SFC<IRootProps> = ({store, history}) => (
  <Provider store={store}>
  <ConnectedRouter history={history}>
    <App />
  </ConnectedRouter>
  </Provider>
);
