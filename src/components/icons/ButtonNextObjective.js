import React from 'react'
import PropTypes from 'prop-types'

import img from './../../assets/UI_NAV_Btn-NextObjective.svg'
import { ImgWrapper } from './SvgWrapper'

const { number } = PropTypes

const ButtonNextObjective = props => <ImgWrapper src={img} {...props} />

ButtonNextObjective.propTypes = { size: number }

export default ButtonNextObjective
