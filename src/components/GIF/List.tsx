import * as React from 'react';
import { IGIFObject } from '../../services';
import { FetchingOnScroll } from '../FetchingOnScroll';
import { IsLoading } from '../IsLoading';
import { GIFItem } from './Item';

interface IGIFListProps {
  results: IGIFObject[];

}

const List: React.SFC<IGIFListProps> = ({ results }) =>  {
    return (
    <div>
      {results.map(gif => (<GIFItem key={gif.id} {...gif} />))}
    </div>
  );
};

export const GIFList = IsLoading(FetchingOnScroll(List));
