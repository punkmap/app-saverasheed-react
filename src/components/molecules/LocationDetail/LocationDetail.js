import React from 'react'
import styled, { css } from 'react-emotion'
import PropTypes from 'prop-types'

import ModalBasic from '../ModalBasic'

const { shape, string, func } = PropTypes

const PopupTitle = styled('h3')({
  textAlign: 'center',
  marginBlockStart: 0,
})
const PopupDescription = styled('div')({
  marginBottom: 10,
})
const PopupHint = styled('div')({
  fontStyle: 'italic',
})

const popupWrapperCx = css({
  bottom: 90,
})

const X = styled('div')({
  position: 'absolute',
  top: 15,
  right: 15,
})

const LocationDetail = ({
  closePopup,
  popupInfo: { name, description, hint },
}) => (
  <ModalBasic
    className="map-popup"
    popupWrapperClassName={popupWrapperCx}
    onClickAway={e => {
      e.preventDefault()
      e.stopPropagation()
      e.target.id !== 'deckgl-overlay' && closePopup()
    }}
  >
    <X onClick={closePopup}>X</X>
    <PopupTitle>{name}</PopupTitle>
    <PopupDescription>{description}</PopupDescription>
    <PopupHint>Hint: {hint}</PopupHint>
  </ModalBasic>
)

LocationDetail.propTypes = {
  closePopup: func.isRequired,
  popupInfo: shape({
    name: string,
    description: string,
    hint: string,
  }).isRequired,
}

export default LocationDetail
