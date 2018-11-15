import React from 'react'
import PropTypes from 'prop-types'

import img from './../../assets/portis_64x64.png'
import { ImgWrapper } from './SvgWrapper'

const { number } = PropTypes

const PortisPng64 = props => <ImgWrapper src={img} {...props} />

PortisPng64.propTypes = { size: number }

export default PortisPng64
