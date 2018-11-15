import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'react-emotion'

import muiTheme from '../../../theme'
import Button from '../../atoms/Button/Button'

const { string, func } = PropTypes

const {
  palette: {
    tertiary: { main: tertiaryMain, contrastText },
  },
} = muiTheme

const AuthButtonsRoot = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  color: contrastText,
  marginBottom: 50,
})

const AuthButtonsTitle = styled('h1')({
  textAlign: 'center',
  marginBottom: 30,
})

const buttonCx = css({
  color: tertiaryMain,
  padding: 8,
  justifyContent: 'center',
  fontSize: 24,
  marginTop: 16,
})

const LinkExistingAccount = ({ method, email, pendingCredId, linkAccount }) => (
  <AuthButtonsRoot>
    <AuthButtonsTitle>Account Exists</AuthButtonsTitle>
    <div>
      An account with the email {email} exists with {method}. Do you want to
      link this account with {pendingCredId}?
    </div>
    <Button className={buttonCx} onClick={linkAccount}>
      Link Account
    </Button>
  </AuthButtonsRoot>
)

LinkExistingAccount.propTypes = {
  method: string.isRequired,
  email: string.isRequired,
  pendingCredId: string.isRequired,
  linkAccount: func.isRequired,
}

export default LinkExistingAccount
