import React from 'react'
import styled from 'react-emotion'
import { SvgWrapper } from './SvgWrapper'
import PropTypes from 'prop-types'

const { number } = PropTypes

const LogoRoot = styled('g')({
  transform: 'translate(1px, 3px)',
})

const Rect = styled('rect')({ stroke: 'black', strokeWidth: 2, fill: 'none' })
const PixelRoot = styled('g')({ stroke: 'none', fill: 'black' })

const Email = props => (
  <SvgWrapper viewBox="0 0 24 24" {...props}>
    <LogoRoot>
      <Rect x="3" y="3" width="16" height="12" />
      <PixelRoot>
        <rect x="4" y="4" width="2" height="2" />
        <rect x="6" y="6" width="2" height="2" />
        <rect x="8" y="8" width="2" height="2" />
        <rect x="10" y="10" width="2" height="2" />
        <rect x="12" y="8" width="2" height="2" />
        <rect x="14" y="6" width="2" height="2" />
        <rect x="16" y="4" width="2" height="2" />
      </PixelRoot>
    </LogoRoot>
  </SvgWrapper>
)

Email.propTypes = { size: number }

export default Email
