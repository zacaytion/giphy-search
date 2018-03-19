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
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  marginTop: '20px',
});

const List: React.SFC<IGIFListProps> = ({ results }) =>  {
    return (
    <Div>
      {results.map(gif => (<GIFItem key={gif.id} {...gif} />))}
    </Div>
  );
};

export const GIFList = IsLoading(FetchingOnScroll(List));
