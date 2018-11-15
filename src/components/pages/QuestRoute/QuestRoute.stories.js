import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import StoryRouter from 'storybook-react-router'

import QuestRoute from '.'
import { quest } from '../../../fixtures/quests'
import { user1 } from '../../../fixtures/users'

storiesOf('Quest Route', module)
  .addDecorator(StoryRouter())
  .add('default', () => (
    <QuestRoute
      quest={quest}
      questSlug="not-again"
      fetchQuest={action('quest!')}
    />
  ))
