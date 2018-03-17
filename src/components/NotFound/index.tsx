import * as React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.SFC = () => (
  <h1>
    Whoops Page not Found <Link to="/about">About</Link>
  </h1>
);
