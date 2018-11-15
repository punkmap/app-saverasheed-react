import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import LocationCheckin from '.'
import { poi1 } from '../../../fixtures/pois'
import { quest } from '../../../fixtures/quests'

storiesOf('LocationCheckin', module).add('default', () => (
  <LocationCheckin
    confirmCheckin={action('checkin!')}
    closePopup={action('close!')}
    poi={poi1}
    quest={quest}
    userQuadkey="01"
  />
))
