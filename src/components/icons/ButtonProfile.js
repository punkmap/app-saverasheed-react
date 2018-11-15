import React from 'react'
import PropTypes from 'prop-types'

import img from '../../assets/UI_NAV_Btn-Profile.svg'
import { ImgWrapper } from './SvgWrapper'

const { number } = PropTypes

const ButtonProfile = props => <ImgWrapper src={img} {...props} />

ButtonProfile.propTypes = { size: number }

export default ButtonProfile
