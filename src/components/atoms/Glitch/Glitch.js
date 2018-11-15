import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'react-emotion'
import { times, join, pipe, concat, append } from 'ramda'

const { string } = PropTypes

const random = num => Math.floor(Math.random() * Math.floor(num))

const createAnim = pipe(
  num =>
    times(idx => {
      const percentage = (idx / num) * 20
      const top = `${random(100)}%`
      const bottom = `${random(100)}%`
      return `
${percentage}% {
  clip-path: polygon(0% ${top}, 100% ${top}, 100% ${bottom}, 0% ${bottom});
}
`
    }, num),
  append(
    `
20%, 100% {
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
  opacity: 0;
}
`,
  ),
  join('\n'),
)

const anim1 = createAnim(20)
const anim2 = createAnim(20)

const noiseAnim1 = keyframes`${anim1}`
const noiseAnim2 = keyframes`${anim2}`

const GlitchRoot = styled('div')({
  '&&': {
    width: 'auto',
    position: 'relative',
  },
})

const PseudoGlitch = styled('div')({
  // content: 'attr(data-text)',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
})

const GlitchBefore = styled(PseudoGlitch)({
  left: 2,
  textShadow: '-1px 0 red',
  animation: `${noiseAnim2} 5s infinite 1s linear alternate-reverse`,
})
const GlitchAfter = styled(PseudoGlitch)({
  left: -2,
  textShadow: '-1px 0 blue',
  animation: `${noiseAnim1} 5s infinite linear alternate-reverse`,
})

const Glitch = ({ children }) => (
  <GlitchRoot>
    <GlitchBefore>{children}</GlitchBefore>
    {children}
    <GlitchAfter>{children}</GlitchAfter>
  </GlitchRoot>
)

Glitch.propTypes = {
  children: string,
}

export default Glitch
