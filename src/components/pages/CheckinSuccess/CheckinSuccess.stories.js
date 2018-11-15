import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import StoryRouter from 'storybook-react-router'

import CheckinSuccess from '.'
import { quest } from '../../../fixtures/quests'
import { user1 } from '../../../fixtures/users'

storiesOf('Active Quest Route', module)
  .addDecorator(StoryRouter())
  .add('default', () => (
    <CheckinSuccess
      quest={quest}
      questSlug="not-again"
      fetchQuest={action('quests!')}
      user={user1}
    />
  ))
