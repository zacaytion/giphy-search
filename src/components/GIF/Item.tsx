import * as React from 'react';
import { IGIFObject } from '../../services';

export const GIFItem: React.SFC<IGIFObject> = gif => {
  const { images, rating, source, caption } = gif;

  return (
    <div>
      <img src={images.downsized.url} alt={caption}/>
      <ul>
        <li>{caption}</li>
        <li>Rating: {rating}</li>
        <li>Source: {source}</li>
      </ul>
    </div>
  );
};
