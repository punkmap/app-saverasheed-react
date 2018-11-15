import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'react-emotion'

import muiTheme from '../../../theme'
import { mapObjAsArray } from '../../../util/ramda-extra'
import SignInButton from '../../atoms/SignInButton/SignInButton'
import Link from '../../atoms/Link'
import authProviders from './../../../fixtures/authProviders'

const { shape, string, func } = PropTypes

const {
  palette: {
    tertiary: { main: tertiaryMain, contrastText },
  },
} = muiTheme

const AuthButtonsRoot = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  color: tertiaryMain,
  marginBottom: 50,
})

const AuthButtonsTitle = styled('h1')({
  color: contrastText,
  textAlign: 'center',
  marginBottom: 30,
})

const authButtonCx = css({
  marginBottom: 10,
})

const linkCx = css({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
})

const AuthButtons = ({
  match: {
    url,
    params: { authType },
  },
  signIn,
}) => (
  <AuthButtonsRoot>
    <AuthButtonsTitle>
      {authType === 'signin' ? 'Sign In' : 'Sign Up'} with:
    </AuthButtonsTitle>
    {mapObjAsArray(
      auth =>
        auth.id === 'password' ? (
          <Link to={`${url}/email`} className={linkCx} key={auth.id}>
            <SignInButton auth={auth} className={authButtonCx} />
          </Link>
        ) : (
          <SignInButton
            key={auth.id}
            auth={auth}
            className={authButtonCx}
            onClick={() => signIn(auth.id, authType)}
          />
        ),
      authProviders,
    )}
  </AuthButtonsRoot>
)

AuthButtons.propTypes = {
  match: shape({
    url: string,
    params: shape({ authType: string }),
  }).isRequired,
  signIn: func,
}

export default AuthButtons
