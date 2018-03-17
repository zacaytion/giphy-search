import 'normalize.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Root from './containers/Root';
import { history, store } from './state';

ReactDOM.render(
  <Root history={history} store={store}/>,
  document.getElementById('root') as HTMLElement,
);
