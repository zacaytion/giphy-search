import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'rxjs';  /* TODO: only import as needed */
import { Root } from './components/Root';
import { history, store } from './state';

ReactDOM.render(
  <Root history store/>,
  document.getElementById('root') as HTMLElement,
);
