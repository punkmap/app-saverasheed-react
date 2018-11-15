import React from 'react'
import { storiesOf } from '@storybook/react'
import StoryRouter from 'storybook-react-router'
import { action } from '@storybook/addon-actions'

import Profile from '.'
import { user1 } from '../../../fixtures/users'

storiesOf('Profile', module)
  .addDecorator(StoryRouter())
  .add('default', () => <Profile user={user1} logout={action('logout!')} />)
