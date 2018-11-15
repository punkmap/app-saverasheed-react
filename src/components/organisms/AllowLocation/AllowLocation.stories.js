import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import AllowLocation from '.'

storiesOf('AllowLocation', module).add('default', () => (
  <AllowLocation allowLocation={action('allow!')} isLocationAllowed />
))
