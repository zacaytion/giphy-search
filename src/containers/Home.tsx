import * as React from 'react';
import { Link } from 'react-router-dom';
import { AutoComplete } from './AutoComplete';

export const Home: React.SFC = () => (
  <div>
  <h1>Home </h1>
  <Link to='/about'>About</Link>
  <AutoComplete />
  </div>
);
