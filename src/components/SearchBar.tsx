/* tslint:disable:jsx-no-lambda */ // TODO: Research work around?
import * as React from 'react';
import { IGIFObject } from '../services';
import { GIFList } from './GIF/List';

interface ISearchBarProps {
  results: IGIFObject[];
  inProgress: boolean;
  searchTerm: string;
  onTermChanged?: (term: string) => void;
}

const NOOP = () => {}; /* tslint:disable-line:no-empty */

export const SearchBar: React.SFC<ISearchBarProps> =
  ({ results, searchTerm, inProgress, onTermChanged }) => {
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
      gifs = <GIFList results={results} />;
    }
    return (
      <div>
        <h2>Search for GIFs</h2>
        <input
          type='search'
          placeholder='Funny'
          onChange={e => onTermChanged ? onTermChanged(e.target.value) : NOOP}
        />
        <ul>
          {gifs}
        </ul>
      </div>
    );
  };
