import React from 'react'
import PropTypes from 'prop-types'

import img from './../../assets/UI_NAV_Btn-CenterMap.svg'
import { ImgWrapper } from './SvgWrapper'

const { number } = PropTypes

const ButtonCenterMap = props => <ImgWrapper src={img} {...props} />

ButtonCenterMap.propTypes = { size: number }

export default ButtonCenterMap
