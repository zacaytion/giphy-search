/* tslint:disable:jsx-no-lambda jsx-no-multiline-js */
import Downshift, { DownshiftProps, DownshiftState } from 'downshift';
import { css } from 'emotion';
import matchSorter from 'match-sorter';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IGIFObject } from '../services';
import * as actions from '../state/actionCreators';
import { IAppState, initialState } from '../state/initial';
import { currentSearchSelector, gifsSelector, paginationSelector, previousSearchesSelector } from '../state/selectors';
import TypeKeys from '../state/typeKeys';
import {
  ArrowIcon,
  ControllerButton,
  Input,
  Item,
  Menu,
  XIcon,
} from '../styles';

// TODO: Split into two files

interface IDownShiftHOCProps extends DownshiftProps {
  getItems: ( searchTerm: string | null ) => string[];
}

function DownShiftHOC({ getItems, ...rest }: IDownShiftHOCProps ) {
  return (
    <Downshift {...rest}>
      {({
        getInputProps,
        getButtonProps,
        getItemProps,
        isOpen,
        toggleMenu,
        clearSelection,
        selectedItem,
        inputValue,
        highlightedIndex,
      }) => (
        <div className={css({ width: 250, margin: 'auto' })}>
          <div
            className={css({ paddingRight: '1.75em', position: 'relative' })}
          >
            <Input
              isOpen={isOpen}
              {...getInputProps({
                placeholder:   'Search for cool GIFs 😎',
              })}
            />
            {selectedItem ? (
              <ControllerButton
                aria-label="clear selection"
                className={css({ paddingTop: 4 })}
                onClick={clearSelection}
              >
                <XIcon />
              </ControllerButton>
            ) : (
              <ControllerButton {...getButtonProps()}>
                <ArrowIcon isOpen={isOpen} />
              </ControllerButton>
            )}
          </div>
          {!isOpen ? null : (
            <Menu>
              {getItems(inputValue).map((item, index) => (
                <Item
                  key={item}
                  {...getItemProps({
                    index,
                    isActive: highlightedIndex === index,
                    isSelected: selectedItem === item,
                    item,
                  })}
                >
                  {item}
                </Item>
              ))}
            </Menu>
          )}
        </div>
      )}
    </Downshift>
  );
}

type TSearchGIFsAction = typeof actions.searchGIFs;
type TTrendingGIFsAction = typeof actions.trendingGIFs;
type TAddSearchTermAction = typeof actions.addSearchTerm;
type TRemoveSearchTermAction = typeof actions.removeSearchTerm;

interface IAutoCompletePros {
  addSearchTerm: TAddSearchTermAction;
  downShiftState: any;
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
class AutoCompleteContainer extends React.Component<IAutoCompletePros, {}> {
  public handleChange = (selectedSearchTerm: string, downshiftState: DownshiftState) => {
    const { addSearchTerm, removeSearchTerm } = this.props;

    if (!selectedSearchTerm) {
      removeSearchTerm();
    } else {
      addSearchTerm(selectedSearchTerm);
    }
  }
  public getItems = (value: string | null) => {
    const { previousSearches } = this.props;

    return value
      ? matchSorter(previousSearches, value, {
          keys: ['name'],
        })
      : previousSearches;
  }
  public handleStateChange = ( changes: any): any => {
    console.log('handleStateChange', changes); /* tslint:disable-line:no-console */
  }
  public render() {
    const { selectedSearchTerm } = this.props;

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
        <h2>Redux example</h2>
        <DownShiftHOC
          selectedItem={selectedSearchTerm}
          onStateChange={this.handleStateChange}
          onChange={this.handleChange}
          getItems={this.getItems}
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
