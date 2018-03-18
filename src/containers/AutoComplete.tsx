/* tslint:disable:jsx-no-lambda jsx-no-multiline-js */
import Downshift, { DownshiftProps, DownshiftState } from 'downshift';
import { css } from 'emotion';
import matchSorter from 'match-sorter';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { GIFList } from '../components/GIF';
import { SearchBar } from '../components/SearchBar';
import { IGIFObject } from '../services';
import * as actions from '../state/actionCreators';
import { IAppState, initialState } from '../state/initial';
import { currentSearchSelector, gifsSelector, paginationSelector, previousSearchesSelector } from '../state/selectors';
import TypeKeys from '../state/typeKeys';

type TSearchGIFsAction = typeof actions.searchGIFs;
type TTrendingGIFsAction = typeof actions.trendingGIFs;
type TAddSearchTermAction = typeof actions.addSearchTerm;
type TRemoveSearchTermAction = typeof actions.removeSearchTerm;
/* tslint:disable:no-console */
interface IAutoCompleteProps {
  addSearchTerm: TAddSearchTermAction;
  fetchSearchGIFs: TSearchGIFsAction;
  fetchTrendingGIFs: TTrendingGIFsAction;
  previousSearches: string[];
  removeSearchTerm: TRemoveSearchTermAction;
  searchGIFs: IGIFObject[];
  searchOffset: number;
  searchTerm: string;
  selectedSearchTerm: string;
  trendingGIFs: IGIFObject[];
  trendingOffset: number;

}
class AutoCompleteContainer extends React.Component<IAutoCompleteProps> {
  public handleChange = (selectedSearchTerm: string, downshiftState: DownshiftState) => {
    const { addSearchTerm, removeSearchTerm } = this.props;
    console.log('handleChange');
    console.log('selectedSearchTerm', selectedSearchTerm);
    console.log('downshiftState', downshiftState);
    if (!selectedSearchTerm) {
      removeSearchTerm();
    } else {
      addSearchTerm(selectedSearchTerm);
    }
  }
  public renderList(searchGIFs: IGIFObject[], trendingGIFs: IGIFObject[], searchTerm: string | null) {
    const noGIFsYet = searchGIFs.length === 0 && trendingGIFs.length === 0;
    const noSearch = !searchTerm === false;
    if (noGIFsYet && noSearch) {
      return <li key="fetching-gifs"> Fetching fresh GIFs for you ⏳ </li>;
    } else if (noGIFsYet && !noSearch) {
      return <li key="no-results"> No Results Found 🙁 </li>;
    } else {
      return <GIFList searchResults={searchGIFs} trendingResults={trendingGIFs} />;
    }
  }
  public getItems = (value: string | null) => {
    const { previousSearches } = this.props;
    console.log('getItems', previousSearches, value);
    return value
      ? matchSorter(previousSearches, value, {
          keys: ['name'],
        })
      : previousSearches;
  }
  public handleStateChange = ( changes: any): any => {
    const { addSearchTerm } = this.props;
    console.log('handleState', changes.inputValue);
    // addSearchTerm(changes.inputValue);
  }
  public render() {
    const { selectedSearchTerm, searchGIFs, trendingGIFs} = this.props;

    return (
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'sans-serif',
          justifyContent: 'center',
          textAlign: 'center',
        })}
      >
        <h2>GIPHY Searcher</h2>
        <SearchBar
          selectedItem={selectedSearchTerm}
          onStateChange={this.handleStateChange}
          onChange={this.handleChange}
          getItems={this.getItems}
        />
        <ul>
          {this.renderList(searchGIFs, trendingGIFs, selectedSearchTerm)}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state: IAppState) => {
  const searchGIFsSelector = gifsSelector(TypeKeys.GIFS_SEARCH);
  const searchPaginationSelector = paginationSelector(TypeKeys.GIFS_SEARCH);
  const trendingGIFsSelector = gifsSelector(TypeKeys.GIFS_TRENDING);
  const trendingPaginationSelector = paginationSelector(TypeKeys.GIFS_TRENDING);
  return {
    previousSearches: previousSearchesSelector(state),
    searchGIFs: searchGIFsSelector(state),
    searchOffset: searchPaginationSelector(state),
    searchTerm: currentSearchSelector(state),
    selectedSearchTerm: currentSearchSelector(state),
    trendingGIFs: trendingGIFsSelector(state),
    trendingOffset: trendingPaginationSelector(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IAppState>) => {
  return {
    addSearchTerm: (term: string) => {
      dispatch(actions.addSearchTerm(term));
    },
    fetchSearchGIFs: (term: string, offset: number = 0) => {
      dispatch(actions.searchGIFs(term, offset));
    },
    fetchTrendingGIFs: (offset: number = 0) => {
      dispatch(actions.trendingGIFs(offset));
    },
    removeSearchTerm: () => {
      dispatch(actions.removeSearchTerm());
    },
  };
};

export const AutoComplete = connect(mapStateToProps, mapDispatchToProps)(AutoCompleteContainer);
