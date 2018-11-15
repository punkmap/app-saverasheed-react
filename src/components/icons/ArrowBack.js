import React from 'react'
import { SvgWrapper } from './SvgWrapper'
import PropTypes from 'prop-types'

const { number } = PropTypes

const ArrowBack = props => (
  <SvgWrapper viewBox="0 0 24 24" {...props}>
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
  </SvgWrapper>
)

ArrowBack.propTypes = { size: number }

export default ArrowBack
