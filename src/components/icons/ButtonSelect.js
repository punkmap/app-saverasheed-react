import React from 'react'
import PropTypes from 'prop-types'

import img from './../../assets/UI_NAV_Btn-Select.svg'
import { ImgWrapper } from './SvgWrapper'

const { number } = PropTypes

const ButtonSelect = props => <ImgWrapper src={img} {...props} />

ButtonSelect.propTypes = { size: number }

export default ButtonSelect
