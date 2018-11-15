import React from 'react'
import { SvgWrapper } from './SvgWrapper'
import PropTypes from 'prop-types'

const { number } = PropTypes

const Help = props => (
  <SvgWrapper viewBox="4 4 16 16" {...props}>
    <path d="M11 18 h2 v-2 h-2 v2 m1-16 m0 18 m0-14 c-2.21 0-4 1.79-4 4 h2 c0-1.1.9-2 2-2 s2 .9 2 2 c0 2-3 1.75-3 5 h2 c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4" />
  </SvgWrapper>
)

Help.propTypes = { size: number }

export default Help
