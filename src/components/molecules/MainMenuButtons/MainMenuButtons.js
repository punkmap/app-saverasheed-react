import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes, css, cx } from 'react-emotion'
import Link from '../../atoms/Link'

const { bool, shape, number } = PropTypes

const ButtonWrapper = styled('div')({
  marginBottom: 50,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

const topButtonAnim = keyframes`
0% {
  transform: translateX(-1000%);
}

100% {
  transform: translateX(0%);
}
`

const bottomButtonAnim = keyframes`
0% {
  transform: translateX(1000%);
}

100% {
  transform: translateX(0%);
}
`

const buttonAnimInstant = keyframes`
0%, 100% {
  transform: translateX(0%);
}
`

const animationTimingFunction = 'cubic-bezier(0.22, 0.61, 0.36, 1)'

const createAnimCx = ({ duration, delay }) =>
  css({
    transform: 'translateX(-1000%)',
    animationDuration: `${duration}ms`,
    animationDelay: `${delay}ms`,
    animationFillMode: 'forwards',
    animationTimingFunction,
  })

const topAnimCx = css({
  animationName: topButtonAnim,
})

const bottomAnimCx = css({
  animationName: bottomButtonAnim,
})

const skipCx = css({ animation: `${buttonAnimInstant} 1ms forwards` })

const MenuButton = styled('button')({
  color: 'inherit',
  border: 'none',
  backgroundColor: 'transparent',
  fontSize: 32,
  margin: 10,
})

const MainMenuButtons = ({ skip, topAnim, bottomAnim }) => (
  <ButtonWrapper>
    <Link
      to="/main/signin"
      className={cx(createAnimCx(topAnim), topAnimCx, { [skipCx]: skip })}
    >
      <MenuButton>Returning Player</MenuButton>
    </Link>
    <Link
      to="/main/signup"
      className={cx(createAnimCx(bottomAnim), bottomAnimCx, { [skipCx]: skip })}
    >
      <MenuButton>New Player</MenuButton>
    </Link>
  </ButtonWrapper>
)

const anim = shape({ duration: number, delay: number })

MainMenuButtons.propTypes = {
  skip: bool,
  topAnim: anim.isRequired,
  bottomAnim: anim.isRequired,
}

export default MainMenuButtons
