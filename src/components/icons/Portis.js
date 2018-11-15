import React from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'

import { SvgWrapper } from './SvgWrapper'

const { number } = PropTypes

const PortisRoot = styled('g')({
  stroke: 'none',
  transform: 'translate(5px, 5px)',
})

const Portis = props => (
  <SvgWrapper viewBox="0 0 75 75" {...props}>
    <PortisRoot>
      <path fill="#509cba" d="M14,38 A 19 19 0 1 0 49 38" />
      <path
        fill="#6CB3DB"
        d="M14,38 L32,49 C 32,49 26,66 18,59 A 19 19 0 0 1 14 38"
      />
      <path
        fill="#4a6c9b"
        d="M49,38 L32,49 C 32,49 38,66 46,59 A 19 19 0 0 0 49 38"
      />
      <path fill="#6CB3DB" d="M32,0 L14,31 L32,23" />
      <path fill="#4a6c9b" d="M32,0 L50,31 L32,23" />
      <path fill="#3d5578" d="M14,31 L32,43 L32,23" />
      <path fill="#1a425a" d="M50,31 L32,43 L32,23" />
      <path fill="#133444" d="M20,35 L14,38 L32,49 L49,38 L44,35 L32,43" />
    </PortisRoot>
  </SvgWrapper>
)

Portis.propTypes = { size: number }

export default Portis
