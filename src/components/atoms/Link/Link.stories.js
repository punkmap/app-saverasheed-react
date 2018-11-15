import React from 'react'
import { storiesOf } from '@storybook/react'
import Link from '.'

storiesOf('Link', module).add('with text', () => (
  <Link to="foo">Save Rasheed</Link>
))
