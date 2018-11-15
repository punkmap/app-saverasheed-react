import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import AuthButtons from '.'

storiesOf('AuthButtons', module)
  .add('sign in', () => (
    <AuthButtons
      match={{ url: '/main/login', params: { authType: 'login' } }}
      signIn={action('sign in!')}
    />
  ))
  .add('sign up', () => (
    <AuthButtons
      match={{ url: '/main/signup', params: { authType: 'signup' } }}
      signIn={action('sign in!')}
    />
  ))
