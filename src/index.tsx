import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'rxjs';  /* TODO: only import as needed */
import Root from './Root';
import { history, store } from './state';

ReactDOM.render(
  <Root history={history} store={store}/>,
  document.getElementById('root') as HTMLElement,
);
