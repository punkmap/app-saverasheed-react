import React from 'react'
import PropTypes from 'prop-types'

import img from './../../assets/portis_500x500.png'
import { ImgWrapper } from './SvgWrapper'

const { number } = PropTypes

const PortisPng500 = props => <ImgWrapper src={img} {...props} />

PortisPng500.propTypes = { size: number }

export default PortisPng500
