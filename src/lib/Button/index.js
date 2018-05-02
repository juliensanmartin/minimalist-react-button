import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

/**
 * Button Component
 * <Button
 *    name={'submit'}
 *    disabled={false}
 *    label={'Submit'}
 *    onClick={() => {}}
 *    raised={false}
 *    primary={true}
 *    icon={'home'}
 * />
 */
export default class Button extends PureComponent {
  static displayName = 'Button';

  static propTypes = {
    disabled: PropTypes.bool,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onClick: PropTypes.func,
    raised: PropTypes.bool,
    floating: PropTypes.bool,
    primary: PropTypes.bool,
    theme: PropTypes.object,
    children: PropTypes.node,
    color: PropTypes.string
  };

  static defaultProps = {
    onClick: () => {}
  };

  render() {
    const { label } = this.props;

    const buttonLabel = label && <span>{label}</span>;

    return (
      <ButtonStyled type={'button'} {...this.props} onClick={this._handleClick}>
        {buttonLabel}
      </ButtonStyled>
    );
  }

  _handleClick = (e, u) => {
    const { onClick } = this.props;

    if (onClick && typeof onClick === 'function') {
      onClick(e, u);
    }
  };
}

const _getColor = props => {
  const { primary, theme, color } = props;
  return color
    ? color
    : primary
      ? theme.colors.primary
      : theme.colors.brandLightBlue;
};

const _selectBackgroundColor = props => {
  const { raised, floating, theme } = props;
  if (raised || floating) return _getColor(props);
  else return theme.colors.white;
};

const _selectColor = props => {
  const { raised, floating, theme } = props;
  if (!raised && !floating) return _getColor(props);
  else if (raised) return theme.colors.white;
};

const _selectPadding = props => {
  const { floating, raised } = props;
  if (floating) return 0;
  else if (raised) return '8px 28px';
  else return '8px 16px';
};

const _selectMinWidth = props => {
  const { floating } = props;
  return floating ? 0 : '88px';
};

const _selectMinHeight = props => {
  const { floating } = props;
  return floating ? 0 : '36px';
};

const _selectFloatingSize = props => {
  const { floating } = props;
  return floating ? '56px' : '';
};

const _selectBoxShadow = props => {
  const { floating, raised } = props;
  const shadow =
    '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)';
  return floating || raised ? shadow : 'none';
};

const _selectDisabledState = props => {
  const { disabled, floating, raised, theme, color } = props;

  const selectedColor = color ? color : theme.colors.secondary;

  if (disabled)
    return `
      cursor: default; 
      background: ${floating || raised ? selectedColor : 'none'};
      color: ${floating || raised ? 'none' : selectedColor};
      box-shadow: none;
      opacity: 0.5;
      border-color: ${selectedColor};
      &:hover {
        filter: brightness(100%);
      } 
    `;
};

const _selectBorder = props => {
  const { floating, raised } = props;
  if (!floating || !raised)
    return `
      border-width: 1px; 
      border-color: ${_getColor(props)};
    `;
};

const _selectBorderRadius = props => {
  const { floating, raised } = props;
  if (floating) return '50%';
  else if (raised) return '20px';
};

const clickEffect = keyframes`
  50% {
    transform: scale(1.5, 1.5);
    opacity: 0;
  }
  99% {
    transform: scale(0.001, 0.001);
    opacity: 0;
  }
  100% {
    transform: scale(0.001, 0.001);
    opacity: 1;
  }
`;

/**
 * Define the Styled button
 */
const ButtonStyled = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  outline: 0;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  padding: ${_selectPadding};
  min-width: ${_selectMinWidth};
  min-height: ${_selectMinHeight};
  width: ${_selectFloatingSize};
  height: ${_selectFloatingSize};
  background-color: ${_selectBackgroundColor};
  color: ${_selectColor};
  box-shadow: ${_selectBoxShadow};
  border-radius: ${_selectBorderRadius};

  &:hover {
    filter: brightness(75%);
  }

  &:before {
    content: '';
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: ${_selectBorderRadius};
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: scale(0.001, 0.001);
  }

  &:focus {
    outline: 0;
    &:before {
      animation: ${clickEffect} 0.8s ease-out;
    }
  }

  ${_selectBorder} ${_selectDisabledState};
`;
