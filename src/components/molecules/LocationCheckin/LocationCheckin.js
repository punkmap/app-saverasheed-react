import React from 'react'
import styled, { css, cx } from 'react-emotion'
import PropTypes from 'prop-types'

import { poiPropTypes } from '../../../fixtures/pois'
import { questPropTypes } from '../../../fixtures/quests'
import Button from '../../atoms/Button'
import ModalBasic from '../ModalBasic/ModalBasic'

const { func, string } = PropTypes

const rootCx = css({
  // pointerEvents: 'none',
})

const popupWrapperCx = css({
  // top: 15,
  bottom: 90,
})

const PopupTitle = styled('h3')({
  textAlign: 'center',
  textTransform: 'uppercase',
  marginBlockStart: 0,
})
const PopupBody = styled('div')({
  display: 'flex',
})

const PoiImage = styled('img')({
  width: 125,
  minWidth: 125,
  height: 125,
  borderRadius: '50%',
  marginRight: 15,
})

const PoiDescription = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
})

const CheckedText = styled('div')({
  fontWeight: 'bold',
  fontSize: 16,
})

const CheckinButton = styled(Button)({
  width: '100%',
  justifyContent: 'center',
  height: 40,
  borderRadius: 20,
  fontSize: 18,
  marginTop: 5,
})

const X = styled('div')({
  position: 'absolute',
  top: 15,
  right: 15,
})

const LocationCheckin = ({
  confirmCheckin,
  poi,
  poi: { id, name, description, image, checked },
  quest: { checkinButton, checkinCompletion },
  userQuadkey,
  checkingIn,
  closePopup,
}) => (
  <ModalBasic
    className={cx('checkin-popup', rootCx)}
    popupWrapperClassName={popupWrapperCx}
    onClickAway={e => {
      e.preventDefault()
      e.stopPropagation()
      checked && e.target.id !== 'deckgl-overlay' && closePopup()
    }}
  >
    {checked && <X onClick={closePopup}>X</X>}
    <PopupTitle>You found {name}!</PopupTitle>
    <PopupBody>
      {image && <PoiImage src={`https://ipfs.xyo.network/ipfs/${image}`} alt={name} />}
      <PoiDescription>
        {description}
        {checkingIn === id ? (
          <CheckedText>Verifying check-in...</CheckedText>
        ) : checked ? (
          <CheckedText>
            √ {checkinCompletion || 'Threat Eliminated'}
          </CheckedText>
        ) : (
          <CheckinButton onClick={() => confirmCheckin(poi, userQuadkey)}>
            {checkinButton || `Blast 'Em!`}
          </CheckinButton>
        )}
      </PoiDescription>
    </PopupBody>
  </ModalBasic>
)

LocationCheckin.propTypes = {
  confirmCheckin: func.isRequired,
  closePopup: func.isRequired,
  poi: poiPropTypes.isRequired,
  quest: questPropTypes.isRequired,
  userQuadkey: string.isRequired,
  checkingIn: string,
}

export default LocationCheckin
