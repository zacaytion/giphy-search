import { css } from 'emotion';
import * as React from 'react';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';

const Div = styled.div({
    background: 'rebeccapurple',
    marginBottom: '1.45rem',
});

const Div2 = styled.div({
  margin: '0 auto',
  maxWidth: 960,
  padding: '1.45rem 1.0875rem',
});

export const Header: React.SFC = () => {
  return (
  <Div >
    <Div2 >
      <Link
        to="/"
        className={css({ textDecoration: 'none', color: '#FFF'})}
      >
      <h1 style={{ margin: 0 }}>
        React GIPHY Search
      </h1>
      </Link>
      <Link to="/about">About</Link>
    </Div2>
  </Div>
);
};
