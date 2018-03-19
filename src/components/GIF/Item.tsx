import * as React from 'react';
import styled from 'react-emotion';
import { IGIFObject } from '../../services';

const Div = styled.div({
  boxShadow: '2px 2px 4px 0 #ccc',
  boxSizing: 'border-box',
  display: 'inline-block',
  margin: '0 0 1.5em',
  padding: '1em',
  position: 'relative',
  width: '100%',
});

const Img = styled.img({
  width: '100%',
});

export const GIFItem: React.SFC<IGIFObject> = gif => {
  const { images, rating, source, caption } = gif;

  return (
    <Div>
      <Img src={images.downsized.url} alt={caption} />
    </Div>
  );
};
