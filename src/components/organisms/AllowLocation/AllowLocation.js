import React, { Component } from 'react'
import { css } from 'react-emotion'
import PropTypes from 'prop-types'

import Modal from '../../molecules/Modal'
import Button from '../../atoms/Button'
import { ModalP, ModalTitle } from '../../molecules/Modal/Modal'

const { bool, func } = PropTypes

const buttonCx = css({
  fontSize: 18,
  padding: '8px 16px',
})

const screenEffectCx = css({
  display: 'flex',
  alignItems: 'center',
})

class AllowLocation extends Component {
  static propTypes = {
    allowLocation: func.isRequired,
    isLocationAllowed: bool,
  }

  render() {
    const { allowLocation, isLocationAllowed } = this.props
    return (
      <Modal on={!isLocationAllowed} screenEffectClassName={screenEffectCx}>
        <ModalTitle>Save Rasheed is a Geo dApp.</ModalTitle>
        <ModalP>You'll need to allow location access to play the game!</ModalP>
        <ModalP>Please allow location access below.</ModalP>
        <Button className={buttonCx} onClick={allowLocation}>
          Allow
        </Button>
      </Modal>
    )
  }
}

export default AllowLocation
