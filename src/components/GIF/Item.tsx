import { css } from 'emotion';
import * as React from 'react';
import styled from 'react-emotion';
import { IGIFObject } from '../../services';
// tslint:disable:jsx-no-multiline-js
const Div = styled.div();

const Img = styled.img();

export const GIFItem: React.SFC<IGIFObject> = gif => {
  const { images, rating, source, caption } = gif;

  return (
    <div
      className={css({
        flexBasis: 'content',
        flexGrow: 1,
        height: `${images.original.height}px`,
        margin: '5px',
        width: `${images.original.width}px`,
      })}
    >
      <img
        className={css({
          height: `${images.original.height}px`,
          width: `${images.original.width}px`,
        })}
        src={images.original.url}
        alt={caption}
      />
    </div>
  );
};
