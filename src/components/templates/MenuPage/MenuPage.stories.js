import React from 'react'
import { storiesOf } from '@storybook/react'
import StoryRouter from 'storybook-react-router'

import MenuPage from '.'

storiesOf('MenuPage', module)
  .addDecorator(StoryRouter())
  .add('default', () => <MenuPage>MenuPage</MenuPage>)
