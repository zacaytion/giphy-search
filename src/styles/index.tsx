import {
  faAngleDown,
  faAngleUp,
  faTimesCircle,
} from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import styled from 'react-emotion';

const onAttention = '&:hover, &:focus';

interface IInputProps {
  isOpen: boolean;
}
const Input = styled.input<IInputProps>(
  {
    background: '#fff',
    border: '1px solid rgba(34,36,38,.15)',
    borderRadius: '.30rem',
    boxShadow: 'none',
    color: 'rgba(0,0,0,.87)',
    display: 'inline-block',
    fontSize: 14,
    lineHeight: '1em',
    minHeight: '2em',
    outline: 0,
    padding: '1em 2em 1em 1em',
    transition: 'box-shadow .1s ease,width .1s ease',
    whiteSpace: 'normal',
    width: '100%', // full width - icon width/2 - border
    wordWrap: 'break-word',
    [onAttention]: {
      borderColor: '#96c8da',
      boxShadow: '0 2px 3px 0 rgba(34,36,38,.15)',
    },
  },
  ({ isOpen }) =>
    isOpen
      ? {
          borderBottomLeftRadius: '0',
          borderBottomRightRadius: '0',
          [onAttention]: {
            boxShadow: 'none',
          },
        }
      : null,
);

interface IItemProps {
  isActive: boolean;
  isSelected: boolean;
}

const Item = styled.div<IItemProps>(
  {
    border: 'none',
    borderTop: 'none',
    boxShadow: 'none',
    color: 'rgba(0,0,0,.87)',
    cursor: 'pointer',
    display: 'block',
    fontSize: '1rem',
    fontWeight: 400,
    height: 'auto',
    lineHeight: '1em',
    padding: '.8rem 1.1rem',
    position: 'relative',
    textAlign: 'left',
    textTransform: 'none',
    whiteSpace: 'normal',
    wordWrap: 'normal',
  },
  ({ isActive, isSelected }) => {
    const styles = [];
    if (isActive) {
      styles.push({
        background: 'rgba(0,0,0,.03)',
        color: 'rgba(0,0,0,.95)',
      });
    }
    if (isSelected) {
      styles.push({
        color: 'rgba(0,0,0,.95)',
        fontWeight: '700',
      });
    }
    return styles;
  },
);

const Label = styled.label({
  display: 'block',
  fontWeight: 'bold',
  marginBottom: 10,
});

const Menu = styled.div({
  backgroundColor: 'white',
  borderBottomWidth: 1,
  borderColor: '#96c8da',
  borderLeftWidth: 1,
  borderRadius: '0 0 .28571429rem .28571429rem',
  borderRightWidth: 1,
  borderStyle: 'solid',
  borderTopWidth: '0',
  boxShadow: '0 2px 3px 0 rgba(34,36,38,.15)',
  maxHeight: '20rem',
  outline: '0',
  overflowX: 'hidden',
  overflowY: 'auto',
  position: 'absolute',
  transition: 'opacity .1s ease',
  width: '100%',
  zIndex: 1,
});

interface IControllerButtonProps {
  onClick: any;
}
const ControllerButton = styled.button<IControllerButtonProps>({
  alignItems: 'center',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  justifyContent: 'center',
  position: 'absolute',
  right: 0,
  top: 0,
  width: 47,
});

interface IArrowIconProps {
  isOpen: boolean;
}

function ArrowIcon(props: IArrowIconProps) {
  const { isOpen } = props;
  const icon = isOpen ? faAngleUp : faAngleDown;
  return <FontAwesomeIcon icon={icon} />;
}

const XIcon = () => <FontAwesomeIcon icon={faTimesCircle} />;

export { Menu, ControllerButton, Input, Item, Label, ArrowIcon, XIcon };
