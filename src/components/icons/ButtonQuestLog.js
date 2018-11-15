import React from 'react'
import PropTypes from 'prop-types'

import img from './../../assets/UI_NAV_Btn-QuestLog.svg'
import { ImgWrapper } from './SvgWrapper'

const { number } = PropTypes

const ButtonQuestLog = props => <ImgWrapper src={img} {...props} />

ButtonQuestLog.propTypes = { size: number }

export default ButtonQuestLog
