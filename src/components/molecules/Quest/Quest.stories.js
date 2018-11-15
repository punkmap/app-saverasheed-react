import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Quest from '.'
import { quest } from '../../../fixtures/quests'

storiesOf('Quest', module).add('default', () => (
  <Quest quest={quest} idx={1} selectQuest={action('open!')}>
    UserStats
  </Quest>
))
