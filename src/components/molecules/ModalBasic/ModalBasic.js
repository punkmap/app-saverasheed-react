import { ClickAwayListener } from '@material-ui/core'
import React from 'react'
import styled, { keyframes } from 'react-emotion'
import PropTypes from 'prop-types'

import { noop } from '../../../util/ramda-extra'
import theme from '../../../theme'

const { any, func, string } = PropTypes

const {
  palette: {
    primary: { main: primaryMain, dark: primaryDark },
  },
} = theme

const ModalBasicRoot = styled('div')({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 2,
})

const screenAnim = keyframes`
0% {
  background-position: 0 0;
}

100% {
  background-position: 0 30px;
}
`

const PopupWrapper = styled('div')({
  background: `linear-gradient(to bottom, ${primaryDark}, ${primaryDark} 90%, ${primaryMain} 90%, ${primaryMain})`,
  backgroundSize: '100% 30px',
  animation: `${screenAnim} 1.5s linear infinite`,
  padding: 8,
  pointerEvents: 'all',
  overflow: 'scroll',
  borderRadius: 10,
  position: 'absolute',
  left: 5,
  right: 5,
})

const Popup = styled('div')({
  background: primaryMain,
  zIndex: 1,
  padding: '10px 20px',
  borderRadius: 5,
})

const ModalBasic = ({
  onClickAway = noop,
  children,
  className,
  popupWrapperClassName,
  popupClassName,
  onClick,
}) => (
  <ModalBasicRoot className={className}>
    <ClickAwayListener onClickAway={onClickAway}>
      <PopupWrapper onClick={onClick} className={popupWrapperClassName}>
        <Popup className={popupClassName}>{children}</Popup>
      </PopupWrapper>
    </ClickAwayListener>
  </ModalBasicRoot>
)

ModalBasic.propTypes = {
  onClickAway: func,
  children: any.isRequired,
  className: string,
  popupWrapperClassName: string,
  popupClassName: string,
  onClick: func,
}

export default ModalBasic
