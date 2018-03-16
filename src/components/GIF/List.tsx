import * as React from 'react';
import { IGIFObject } from '../../services';
import { GIFItem } from './Item';

interface IGIFListProps {
  results: IGIFObject[];
}

export const GIFList: React.SFC<IGIFListProps> = ({ results }) => (
  <> /* This is shorthand for React.Fragment  */
    {results.map(gif => (<GIFItem key={gif.id} {...gif} />))}
  </>
);
