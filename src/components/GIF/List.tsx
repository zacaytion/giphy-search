import * as React from 'react';
import { IGIFObject } from '../../services';
import { GIFItem } from './Item';

interface IGIFListProps {
  results: IGIFObject[];
  inProgress: boolean;
}

export const GIFList: React.SFC<IGIFListProps> = ({ results, inProgress }) => {
  let gifs = null;
  if (inProgress) {
    gifs = [
      <li key='fetching-gifs'> Fetching fresh GIFs for you ⏳ </li>,
    ];
  } else if (results.length === 0) {
    gifs = [
      <li key='no-results'> No Results Found 🙁 </li>,
    ];
  } else {
    gifs = results.map(gif => (
      <GIFItem key={gif.id} {...gif} />
    ));
  }
  return (
      <ul>
        {results}
      </ul>
  );
};
