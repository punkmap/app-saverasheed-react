import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import StoryRouter from 'storybook-react-router'

import QuestLog from '.'
import quests from '../../../fixtures/quests'

storiesOf('Quest Log', module)
  .addDecorator(StoryRouter())
  .add('default', () => (
    <QuestLog
      quests={quests}
      fetchQuests={action('quests!')}
      selectQuest={action('open!')}
    />
  ))
