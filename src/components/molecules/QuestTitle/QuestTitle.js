import React from 'react'
import styled, { css, cx } from 'react-emotion'
import PropTypes from 'prop-types'

import { PENDING, questPropTypes } from '../../../fixtures/quests'
import theme from '../../../theme'
import ModalBasic from '../ModalBasic'

const { arrayOf, any, func, string } = PropTypes

const {
  palette: {
    secondary: { main: secondaryMain },
  },
} = theme

const rootCx = css({
  pointerEvents: 'none',
})
const PopupTitle = styled('h3')({
  textAlign: 'center',
  marginBlockStart: 0,
  marginBlockEnd: 0,
  margin: 0,
  textTransform: 'uppercase',
  fontSize: '0.9em',
})
const popupWrapperCx = css({
  top: 15,
})

const Badge = styled('div')(
  {
    position: 'absolute',
    top: 10,
    right: 10,
    color: 'white',
    backgroundColor: secondaryMain,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 15,
    height: 15,
  },
  ({ big }) =>
    big && {
      width: 25,
      height: 25,
    },
)

const QuestTitle = ({
  userCheckins,
  checkinHash,
  push,
  quest: { name, checkins, status },
}) => (
  <ModalBasic
    className={cx(rootCx, 'map-popup')}
    popupWrapperClassName={popupWrapperCx}
    onClick={() =>
      status === PENDING && push(`complete-quest?hash=${checkinHash}`)
    }
  >
    <PopupTitle>{name}</PopupTitle>
    {status === PENDING && <Badge>!</Badge>}
    {/*{status === COMPLETED && <Badge big>👑</Badge>}*/}
  </ModalBasic>
)

QuestTitle.propTypes = {
  quest: questPropTypes.isRequired,
  userCheckins: arrayOf(any),
  push: func.isRequired,
  checkinHash: string,
}

export default QuestTitle
