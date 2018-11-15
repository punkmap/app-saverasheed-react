import React from 'react'
import PropTypes from 'prop-types'

import img from './../../assets/UI_NAV_Btn-BacktoMap.svg'
import { ImgWrapper } from './SvgWrapper'

const { number } = PropTypes

const ButtonBackToMap = props => <ImgWrapper src={img} {...props} />

ButtonBackToMap.propTypes = { size: number }

export default ButtonBackToMap
