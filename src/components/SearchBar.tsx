/* tslint:disable:jsx-no-lambda jsx-no-multiline-js */
import Downshift, { DownshiftProps, DownshiftState } from 'downshift';
import { css } from 'emotion';
import * as React from 'react';
import {
  ArrowIcon,
  ControllerButton,
  Input,
  Item,
  Menu,
  XIcon,
} from '../styles';

interface ISearchBarProps extends DownshiftProps {
  getItems: ( searchTerm: string | null ) => string[];

}

export const SearchBar: React.SFC<ISearchBarProps> = ({ getItems, ...rest }) => {
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
        <div className={css({ width: '75%', margin: 'auto' })}>
          <div
            className={css({ paddingRight: '1.75em', position: 'relative' })}
          >
            <Input
              isOpen={isOpen}
              {...getInputProps({
                placeholder: 'Search for cool GIFs 😎',
              })}
            />
            {selectedItem ? (
              <ControllerButton
                aria-label="clear selection"
                className={css({ paddingTop: 1 })}
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
};
