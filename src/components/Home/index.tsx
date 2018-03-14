import * as React from 'react';
import { Link } from 'react-router-dom';

export const Home: React.SFC = () => (
  <h1>Home <Link to='/about'>About</Link></h1>
);
