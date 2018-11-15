import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'react-emotion'

import muiTheme from '../../../theme'
import Button from '../../atoms/Button'

const { shape, string, func } = PropTypes

const {
  palette: {
    primary: { main: primaryMain, contrastText: primaryContrastText },
    tertiary: { main: tertiaryMain, contrastText },
  },
} = muiTheme

const EmailForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
})

const EmailAuthRoot = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  color: tertiaryMain,
  marginBottom: 50,
})

const EmailAuthTitle = styled('h1')({
  color: contrastText,
  textAlign: 'center',
  marginBottom: 30,
})

const EmailInput = styled('input')({
  padding: 10,
  fontSize: 16,
  marginBottom: 10,
})

const buttonCx = css({
  backgroundColor: primaryMain,
  justifyContent: 'center',
  color: primaryContrastText,
  fontSize: 24,
  padding: '16px 8px',
})

class EmailAuth extends Component {
  static propTypes = {
    match: shape({
      params: shape({ authType: string }),
    }).isRequired,
    submit: func.isRequired,
    email: string,
  }

  static defaultProps = {
    email: '',
  }

  state = { email: this.props.email, password: '' }

  handleChange = type => e => this.setState({ [type]: e.target.value })

  handleSubmit = e => {
    e.preventDefault()
    const {
      match: {
        params: { authType },
      },
    } = this.props
    const { email, password } = this.state
    this.props.submit('password', authType, email, password)
  }

  render() {
    const {
      match: {
        params: { authType },
      },
    } = this.props

    const { email, password } = this.state

    return (
      <EmailAuthRoot>
        <EmailAuthTitle>
          {authType === 'signin' ? 'Sign In' : 'Sign Up'} with email
        </EmailAuthTitle>
        <EmailForm>
          <EmailInput
            placeholder="email"
            value={email}
            onChange={this.handleChange('email')}
          />
          <EmailInput
            type="password"
            placeholder="password"
            value={password}
            onChange={this.handleChange('password')}
          />
          <Button className={buttonCx} onClick={this.handleSubmit}>
            Begin Quest!
          </Button>
        </EmailForm>
      </EmailAuthRoot>
    )
  }
}

export default EmailAuth
