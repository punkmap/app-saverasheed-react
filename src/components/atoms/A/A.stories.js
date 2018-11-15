import React from 'react'
import { storiesOf } from '@storybook/react'
import A from '.'

storiesOf('A', module).add('with text', () => (
  <A href="https://google.com">Save Rasheed</A>
))
