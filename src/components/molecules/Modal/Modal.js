import React, { Component } from 'react'
import styled, { css, keyframes, cx } from 'react-emotion'
import PropTypes from 'prop-types'

import ScreenEffect from '../../templates/ScreenEffect'
import theme from '../../../theme'
import { noop } from '../../../util/ramda-extra'

const { bool, any, string, func } = PropTypes

const {
  palette: {
    primary: { main, dark },
  },
} = theme

const ModalRoot = styled('div')(
  {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 75,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0px 15px',
    zIndex: 999,
    textAlign: 'center',
    background: 'rgba(0,0,0, 0.7)',
    transition: 'background 300ms',
  },
  ({ on }) => !on && { pointerEvents: 'none', background: 'rgba(0,0,0, 0.0)' },
  ({ noOverlay }) =>
    noOverlay && {
      background: 'rgba(0,0,0, 0.0)',
    },
)

export const ModalTitle = styled('h1')({
  lineHeight: '30px',
  textAlign: 'center',
})

const screenAnim = keyframes`
0% {
  background-position: 0 0;
}

100% {
  background-position: 0 30px;
}
`

const ModalWrapper = styled('div')({
  // background: `linear-gradient(to bottom, ${main}, ${main} 50%, ${dark} 50%, ${dark})`,
  // backgroundSize: '100% 40px',
  background: `linear-gradient(to bottom, ${dark}, ${dark} 90%, ${main} 90%, ${main})`,
  backgroundSize: '100% 30px',
  animation: `${screenAnim} 1.5s linear infinite`,
  padding: 8,
  // height: '100%',
  maxHeight: '100%',
  pointerEvents: 'all',
  overflow: 'scroll',
  borderRadius: 10,
})

const ModalBody = styled('div')({
  padding: '2px 8px 8px',
  backgroundColor: main,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const ModalP = styled('p')({})

const screenEffectCx = css({
  border: 'none',
  background: 'none',
  lineHeight: '20px',
  // height: 'auto',
})

class Modal extends Component {
  static propTypes = {
    on: bool,
    noOverlay: bool,
    children: any,
    wrapperClassName: string,
    bodyClassName: string,
    screenEffectClassName: string,
    onClick: func,
    onOverlayClick: func,
  }

  render() {
    const {
      on,
      children,
      bodyClassName,
      wrapperClassName,
      screenEffectClassName,
      onClick = noop,
      onOverlayClick = noop,
      ...props
    } = this.props
    return (
      <ModalRoot on={on} {...props} onClick={onOverlayClick}>
        <ScreenEffect
          on={on}
          className={cx(screenEffectCx, screenEffectClassName)}
          onClick={e => e.stopPropagation()}
          showAnim
        >
          <ModalWrapper className={wrapperClassName}>
            <ModalBody
              className={bodyClassName}
              onClick={e => {
                e.stopPropagation()
                onClick(e)
              }}
            >
              {children}
            </ModalBody>
          </ModalWrapper>
        </ScreenEffect>
      </ModalRoot>
    )
  }
}

export default Modal
