import * as React from 'react';
import styled from 'react-emotion';
import { IGIFObject } from '../../services';
import { FetchingOnScroll } from '../FetchingOnScroll';
import { IsLoading } from '../IsLoading';
import { GIFItem } from './Item';

interface IGIFListProps {
  results: IGIFObject[];

}

const Div = styled.div({
  columnGap: '1.5em',
  fontSize: '.85em',
  margin: '1.5em 0',
  padding: '0',
});

const List: React.SFC<IGIFListProps> = ({ results }) =>  {
    return (
    <Div>
      {results.map(gif => (<GIFItem key={gif.id} {...gif} />))}
    </Div>
  );
};

export const GIFList = IsLoading(FetchingOnScroll(List));
