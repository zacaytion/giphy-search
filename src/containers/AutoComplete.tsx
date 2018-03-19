/* tslint:disable:jsx-no-lambda jsx-no-multiline-js */
import Downshift, { DownshiftProps, DownshiftState } from 'downshift';
import { css } from 'emotion';
import matchSorter from 'match-sorter';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { GIFList, SearchBar } from '../components';
import { IGIFObject } from '../services';
import * as actions from '../state/actionCreators';
import { IAppState, initialState } from '../state/initial';
import {
  currentSearchSelector,
  gifsSelector,
  isFetchingSearchingSelector,
  isFetchingTrendingSelector,
  paginationSelector,
  previousSearchesSelector,
} from '../state/selectors';
import TypeKeys from '../state/typeKeys';

type TSearchGIFsAction = typeof actions.searchGIFs;
type TTrendingGIFsAction = typeof actions.trendingGIFs;
type TClearGIFs = typeof actions.clearGIFs;
/* tslint:disable:no-console */
interface IAutoCompleteProps {
  clearSearchGifs: TClearGIFs;
  fetchSearchGIFs: TSearchGIFsAction;
  fetchTrendingGIFs: TTrendingGIFsAction;
  previousSearches: string[];
  searchGIFs: IGIFObject[];
  searchIsFetching: boolean;
  searchOffset: number;
  selectedSearchTerm: string | null;
  trendingGIFs: IGIFObject[];
  trendingIsFetching: boolean;
  trendingOffset: number;
}

/**
 * Connected Component for controlling state and managing props to send to SearchBar
 *
 * @class AutoCompleteContainer
 * @extends {React.Component<IAutoCompleteProps>}
 */
class AutoCompleteContainer extends React.Component<IAutoCompleteProps> {

  /**
   * Called when the user selects an item and when the currently selected item changes
   *
   * @memberof AutoCompleteContainer
   */
  public handleChange = (selectedSearchTerm: string, downshiftState: DownshiftState) => {
    const { clearSearchGifs} = this.props;
    if (!selectedSearchTerm) {
      clearSearchGifs();
    }
  }

  /**
   * Called when the internal state of Downshift is changed
   *
   * @memberof AutoCompleteContainer
   */
  public handleStateChange = ( changes: any): any => {
    const { fetchSearchGIFs } = this.props;
    const { selectedItem } = changes;
    if (!!selectedItem) {
      fetchSearchGIFs(selectedItem);
    }
  }

  /**
   * Compares the input in the search bar with the previous searched results
   * If there is not a match, it places the input in the drop down.
   *
   * @memberof AutoCompleteContainer
   */
  public getItems = (value: string | null) => {
    const { previousSearches } = this.props;
    const items = value
      ? matchSorter(previousSearches, value)
      : previousSearches;
    return items.length !== 0
      ? items
      : [value];
  }

  /**
   * Passed down to FetchingOnScroll
   * Used to determine whether to fetch trending or searching gifs
   *
   * @memberof AutoCompleteContainer
   */
  public scrollFunction = (): any => {
    const {
      searchIsFetching,
      selectedSearchTerm,
      searchGIFs,
      trendingIsFetching,
      trendingGIFs,
      searchOffset,
      trendingOffset,
      fetchSearchGIFs,
      fetchTrendingGIFs,
    } = this.props;

    const emptyTrendingGifs = trendingGIFs.length === 0;
    const emptySearchGifs = searchGIFs.length === 0;

    if (!selectedSearchTerm && !emptyTrendingGifs && !trendingIsFetching) {
      return fetchTrendingGIFs(trendingOffset);
    } else if (!!selectedSearchTerm && !emptySearchGifs && !searchIsFetching) {
      return fetchSearchGIFs(selectedSearchTerm, searchOffset);
    } else {
      return () => (console.log('NOOP')); // NOOP
    }
  }

  /**
   * Logic for determining which type of gifs to show based on input and currently stored gifs
   *
   * @returns {*}
   * @memberof AutoCompleteContainer
   */
  public gifsToDisplay(): any {
    const { selectedSearchTerm, searchGIFs, trendingGIFs } = this.props;
    if (!selectedSearchTerm) {
      return trendingGIFs;
    } else if (searchGIFs.length === 0 && trendingGIFs.length !== 0) {
      return trendingGIFs;
    } else {
      return searchGIFs;
    }
  }

  /**
   * Passed into IsLoading Wrapper.
   *
   * @returns {boolean}
   * @memberof AutoCompleteContainer
   */
  public isLoading(): boolean  {
    const { selectedSearchTerm, searchGIFs, trendingGIFs, searchIsFetching,  trendingIsFetching } = this.props;
    if (!selectedSearchTerm && trendingIsFetching ) {
      return true;
    } else if (searchIsFetching && !!selectedSearchTerm) {
      return true;
    } else {
      return false;
    }
  }

  public render() {
    const { searchIsFetching, selectedSearchTerm, searchGIFs, trendingIsFetching, trendingGIFs} = this.props;

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
         <GIFList
          results={this.gifsToDisplay()}
          scrollFunction={this.scrollFunction}
          isLoading={this.isLoading()}
         />
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
    searchIsFetching: isFetchingSearchingSelector(state),
    searchOffset: searchPaginationSelector(state),
    selectedSearchTerm: currentSearchSelector(state),
    trendingGIFs: trendingGIFsSelector(state),
    trendingIsFetching: isFetchingTrendingSelector(state),
    trendingOffset: trendingPaginationSelector(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IAppState>) => {
  return {
    clearSearchGifs: () => {
      dispatch(actions.clearGIFs(TypeKeys.GIFS_SEARCH));
    },
    fetchSearchGIFs: (term: string, offset: number = 0) => {
      dispatch(actions.searchGIFs(term, offset));
    },
    fetchTrendingGIFs: (offset: number = 0) => {
      dispatch(actions.trendingGIFs(offset));
    },
  };
};

export const AutoComplete = connect(mapStateToProps, mapDispatchToProps)(AutoCompleteContainer);
