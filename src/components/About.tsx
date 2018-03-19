import * as React from 'react';
import { Link } from 'react-router-dom';

export const About: React.SFC = () => (
  <h1>
    About <Link to="/">Home</Link>
  </h1>
);
