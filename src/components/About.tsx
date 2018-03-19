import * as React from 'react';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';

const Div = styled.div({
  margin: '0 auto',
  width: '50%',
});
export const About: React.SFC = () => (
<Div>
  <h1>
    About This Site:
  </h1>
  <p>
    Built with Typescript, React, Redux, RxJS and Emotion
    </p>
  </Div>
);
