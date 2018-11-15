import React from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'

import {
  authNamePropTypes,
  authIdPropTypes,
} from '../../../fixtures/authProviders'

import Button from '../Button'

const { shape, any } = PropTypes

const IconWrapper = styled('div')({
  // background: 'white',
  padding: 8,
  display: 'flex',
  alignItems: 'center',
  marginRight: 16,
})

const SignInButton = ({ auth: { name, id, Icon }, ...props }) => (
  <Button {...props}>
    <IconWrapper>
      <Icon size={18} />
    </IconWrapper>
    <span>{name}</span>
  </Button>
)

SignInButton.propTypes = {
  auth: shape({
    name: authNamePropTypes.isRequired,
    id: authIdPropTypes.isRequired,
    Icon: any.isRequired,
  }).isRequired,
}

export default SignInButton
