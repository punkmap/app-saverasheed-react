import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import LocationDetail from '.'
import { poi1 } from '../../../fixtures/pois'

const popupInfo = {
  name: poi1.name,
  description: poi1.description,
  hint: poi1.hint,
}

storiesOf('LocationDetail', module).add('default', () => (
  <LocationDetail closePopup={action('close!')} popupInfo={popupInfo} />
))
