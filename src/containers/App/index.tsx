import * as React from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { About } from '../../components/About';
import { Home } from '../../components/Home';
import { NotFound } from '../../components/NotFound';

const App = () => (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/about' component={About} />
      <Route component={NotFound} />
    </Switch>
);

export default hot(module)(App);
