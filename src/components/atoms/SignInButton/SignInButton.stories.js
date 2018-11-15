import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  facebookAuth,
  googleAuth,
  passwordAuth,
} from '../../../fixtures/authProviders'
import SignInButton from '.'

storiesOf('SignInButton', module)
  .add('with Google', () => <SignInButton auth={googleAuth} />)
  .add('with Facebook', () => <SignInButton auth={facebookAuth} />)
  .add('with Email', () => <SignInButton auth={passwordAuth} />)
