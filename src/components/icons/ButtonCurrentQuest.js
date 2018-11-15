import React from 'react'
import PropTypes from 'prop-types'

import img from './../../assets/UI_NAV_Btn-CurrentQuest.svg'
import { ImgWrapper } from './SvgWrapper'

const { number } = PropTypes

const ButtonCurrentQuest = props => <ImgWrapper src={img} {...props} />

ButtonCurrentQuest.propTypes = { size: number }

export default ButtonCurrentQuest
