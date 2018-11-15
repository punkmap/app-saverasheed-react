import React from 'react'
import { storiesOf } from '@storybook/react'
import StoryRouter from 'storybook-react-router'

import EditProfile from '.'
import { user1 } from '../../../fixtures/users'

storiesOf('EditProfile', module)
  .addDecorator(StoryRouter())
  .add('default', () => <EditProfile user={user1} />)
