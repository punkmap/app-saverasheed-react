import React from 'react'
import { storiesOf } from '@storybook/react'
import StoryRouter from 'storybook-react-router'

import BottomNav from '.'
import { sampleLocation } from '../../../fixtures/router'

storiesOf('BottomNav', module)
  .addDecorator(StoryRouter())
  .add('default', () => (
    <BottomNav location={sampleLocation} activeQuestSlug="foo-bar">
      BottomNav
    </BottomNav>
  ))
