import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import EmailAuth from '.'

storiesOf('EmailAuth', module)
  .add('sign in', () => (
    <EmailAuth
      match={{ url: '/main/login', params: { authType: 'login' } }}
      submit={action('click!')}
    />
  ))
  .add('sign up', () => (
    <EmailAuth
      match={{ url: '/main/signup', params: { authType: 'signup' } }}
      submit={action('click!')}
    />
  ))
