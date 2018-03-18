import * as React from 'react';
import { IGIFObject } from '../../services';
import { GIFItem } from './Item';

interface IGIFListProps {
  searchResults: IGIFObject[];
  trendingResults: IGIFObject[];
}

export const GIFList: React.SFC<IGIFListProps> = ({ searchResults, trendingResults }) =>  {

  let results;
  if (searchResults.length > 0) {
    results = searchResults;
  } else {
    results = trendingResults;
  }

  return (
    <> {/* shorthand for React.Fragment */}
      {results.map(gif => (<GIFItem key={gif.id} {...gif} />))}
    </>
  );
};
