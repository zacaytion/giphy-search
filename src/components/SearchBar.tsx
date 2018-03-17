/* tslint:disable:jsx-no-lambda */ // TODO: Research work around?
import * as React from 'react';
import { IGIFObject } from '../services';
import { TSearchGIFs } from '../state/actionCreators';
import { GIFList } from './GIF/List';

interface ISearchBarProps {
  results: IGIFObject[];
  searchTerm: string;
  onTermChanged?: TSearchGIFs;
}

const NOOP = () => {}; /* tslint:disable-line:no-empty */

export const SearchBar: React.SFC<ISearchBarProps> = ({
  results,
  searchTerm,
  onTermChanged,
}) => {
  let gifs = null;
  if (results.length === 0 && searchTerm.length === 0) {
    gifs = [<li key="fetching-gifs"> Fetching fresh GIFs for you ⏳ </li>];
  } else if (results.length === 0) {
    gifs = [<li key="no-results"> No Results Found 🙁 </li>];
  } else {
    gifs = <GIFList results={results} />;
  }
  return (
    <div>
      <h2>Search for GIFs</h2>
      <input
        type="search"
        placeholder="Funny"
        onChange={e => (onTermChanged ? onTermChanged(e.target.value) : NOOP)}
      />
      <ul>{gifs}</ul>
    </div>
  );
};
