import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import ButtonLink from '.'

storiesOf('ButtonLink', module).add('default', () => (
  <ButtonLink onClick={action('click!')}>Click me!</ButtonLink>
))
