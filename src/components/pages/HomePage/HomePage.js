import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'
import { TripOrigin } from '@material-ui/icons'
import { css, cx } from 'react-emotion'
import { isEmpty } from 'ramda'

import { poiPropTypes } from '../../../fixtures/pois'
import { questPropTypes } from '../../../fixtures/quests'
import FSButton from '../../../containers/FSButton'
import Map from '../../../containers/Map'
import { LocationCheckin } from '../../molecules/LocationCheckin'
import { LocationDetail } from '../../molecules/LocationDetail'
import QuestTitle from '../../molecules/QuestTitle/QuestTitle'
import AllowLocation from '../../organisms/AllowLocation'
import Page from '../../templates/Page'
import muiTheme from '../../../theme'
import Help from '../../icons/Help'

const { bool, func, oneOf, shape, arrayOf, number, any, string } = PropTypes

const {
  palette: {
    tertiary: { main, contrastText },
  },
} = muiTheme

const buttonCx = css({
  '&&&&&': {
    backgroundColor: main,
    color: contrastText,
    position: 'absolute',
    bottom: 30,
  },
})

const centerButtonCx = css({
  right: 20,
})

const helpButtonCx = css({
  left: 20,
})

const pageCx = css({
  // display: 'none',
  position: 'absolute',
  left: '-100%',
  top: '-100%',
  transform: 'translate(-100%, -100%)',
  opacity: 0,
  pointerEvents: 'none',
})

const HomePage = ({
  isLocationAllowed,
  allowLocation,
  centerMap,
  isCentered,
  quest,
  userPoi,
  confirmCheckin,
  toggleIntro,
  userQuadkey,
  checkingIn,
  popupInfo,
  closePopup,
  popupStatus,
  isExact,
  userCheckins,
  push,
  checkinHash,
  ...props
}) => {
  return (
    <Page
      withNav
      screenEffectClassName={cx({
        [pageCx]: !isExact,
      })}
      {...props}
    >
      <Map />
      <FSButton />
      <AllowLocation
        allowLocation={allowLocation}
        isLocationAllowed={isLocationAllowed}
      />
      {!isCentered && (
        <Button
          onClick={centerMap}
          classes={{ root: cx(buttonCx, centerButtonCx) }}
          variant="fab"
          aria-label="Origin"
        >
          <TripOrigin />
        </Button>
      )}
      <Button
        onClick={() => toggleIntro(true)}
        classes={{ root: cx(buttonCx, helpButtonCx) }}
        variant="fab"
        aria-label="help"
      >
        <Help color="inherit" />
      </Button>
      {quest && !isEmpty(quest) && (
        <QuestTitle
          push={push}
          checkinHash={checkinHash}
          userCheckins={userCheckins}
          quest={quest}
        />
      )}
      {(popupStatus === 'CHECK_IN_SCREEN' ||
        popupStatus === 'CHECKED_IN_SCREEN') && (
         <LocationCheckin
           confirmCheckin={confirmCheckin}
           poi={userPoi}
           quest={quest}
           userQuadkey={userQuadkey}
           checkingIn={checkingIn}
           closePopup={closePopup}
         />
       )}
      {popupStatus === 'POPUP' && (
        <LocationDetail popupInfo={popupInfo} closePopup={closePopup} />
      )}
    </Page>
  )
}

HomePage.propTypes = {
  isLocationAllowed: bool,
  allowLocation: func.isRequired,
  userPoi: poiPropTypes,
  confirmCheckin: func.isRequired,
  quest: questPropTypes,
  userQuadkey: string.isRequired,
  checkingIn: string,
  popupInfo: shape({
    lat: number,
    lng: number,
  }),
  closePopup: func,
  popupStatus: oneOf(['CHECK_IN_SCREEN', 'CHECKED_IN_SCREEN', 'POPUP', '']),
  isExact: bool,
  userCheckins: arrayOf(any),
}

export default HomePage
