import * as React from 'react';
import { IGIFObject } from '../../services';

export const GIFItem: React.SFC<IGIFObject> = gif => {
  const { images, rating, source, caption } = gif;

  return (
    <li>
      <img src={images.downsized.url} alt={caption}/>
      <p>{caption}</p>
      <p>Rating: {rating}</p>
      <p>Source: {source}</p>
    </li>
  );
};
