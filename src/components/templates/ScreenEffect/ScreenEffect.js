import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'
import styled, { keyframes, cx, css } from 'react-emotion'

const { any, bool, string } = PropTypes

const easeOutQuint = 'cubic-bezier(0.230, 1.000, 0.320, 1.000)'
const easeInQuint = 'cubic-bezier(0.755, 0.050, 0.855, 0.060)'
const screenBackground = '#121010'

export const turnOn = keyframes`
0% {
  transform: scale(1,0.8) translate3d(0,0,0);
  filter: brightness(30);
  opacity: 1;
}

28% {
  transform: scale(1,0.8) translate3d(0,100%,0);
}

28.8% {
  transform: scale(1,0.8) translate3d(0,-100%,0);
  opacity: 1;
} 

72% {
  transform: scale(1.3,0.6) translate3d(0,100%,0);
  filter: brightness(30);
  opacity: 0;
}

88% {
  transform: scale(1,1) translate3d(0,0,0);
  filter: contrast(0) brightness(0);
  opacity: 1;
}

100% {
  transform: scale(1,1) translate3d(0,0,0);
  filter: contrast(1) brightness(1.2) saturate(1.3);
  opacity: 1;
}
`

const turnOff = keyframes`
0% {
  transform: scale(1,1.3) translate3d(0,0,0);
  filter: brightness(1);
  opacity: 1;
}
60% {
  transform: scale(1.3,0.001) translate3d(0,0,0);
  filter: brightness(10);
}
100% {
  animation-timing-function: ${easeInQuint};
  transform: scale(0.000,0.0001) translate3d(0,0,0);
  filter: brightness(50);
}
`

const ScreenEffectContainer = styled('div')({
  background: screenBackground,
  width: '100%',
  height: '100%',
  position: 'relative',
  overflow: 'auto',
})

const screenCx = css({
  width: '100%',
  height: '100%',
  border: 'none',
  '&-enter-active': {
    animation: `${turnOn} 300ms linear`,
    animationFillMode: 'forwards',
  },
  '&-exit-active': {
    animation: `${turnOff} 550ms ${easeOutQuint}`,
    animationFillMode: 'forwards',
  },
})

const ScreenEffect = ({ children, on, showAnim, className = '', ...props }) => (
  <ScreenEffectContainer
    className={cx('screen-effect-container', className)}
    {...props}
  >
    <CSSTransition
      in={on}
      timeout={{
        enter: 300,
        exit: 550,
      }}
      unmountOnExit
      classNames={screenCx}
    >
      <Fragment>{children}</Fragment>
    </CSSTransition>
  </ScreenEffectContainer>
)

ScreenEffect.propTypes = {
  children: any.isRequired,
  on: bool.isRequired,
  className: string,
}

export default ScreenEffect
