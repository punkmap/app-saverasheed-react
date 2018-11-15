import React, { Component, Fragment } from 'react'
import styled from 'react-emotion'
import { prop } from 'ramda'
import PropTypes from 'prop-types'

import { userPropTypes } from '../../../fixtures/users'
import theme from '../../../theme'
import { containsBy, mapObjAsArray } from '../../../util/ramda-extra'
import Button from '../../atoms/Button'
import MenuPage from '../../templates/MenuPage'
import {
  googleAuth,
  facebookAuth,
  authIdPropTypes,
  portisAuth,
} from '../../../fixtures/authProviders'

const { func } = PropTypes

const {
  palette: {
    primary: { main: primaryMain, contrastText: primaryContrastText },
  },
} = theme

const ProfilePageContent = styled('div')({})

const SectionHeading = styled('h3')({
  padding: '2px 5px',
  display: 'inline-block',
  borderBottom: `solid 2px ${primaryMain}`,
})

const authProviders = [googleAuth, facebookAuth, portisAuth]

const IconWrapper = styled('div')({
  // background: 'white',
  padding: 8,
  display: 'flex',
  alignItems: 'center',
  marginRight: 8,
})

const SignInButtonRoot = styled(Button)(
  {
    marginBottom: 10,
  },
  ({ linked }) =>
    linked
      ? {
          color: 'white',
          backgroundColor: 'gray',
          border: 'solid 1px white',
        }
      : {
          color: primaryContrastText,
          backgroundColor: primaryMain,
          border: `solid 1px ${primaryMain}`,
        },
)

const SignInButton = ({
  auth: { name, id, Icon },
  linked,
  linking,
  ...props
}) => (
  <SignInButtonRoot linked={linked} {...props}>
    <IconWrapper>
      <Icon size={18} />
    </IconWrapper>
    <span>
      {linking
        ? `${linked ? 'Unlinking...' : 'Linking...'}`
        : `${linked ? 'Unlink' : 'Link'} ${name}`}
    </span>
  </SignInButtonRoot>
)

class EditProfile extends Component {
  static propTypes = {
    user: userPropTypes,
    unlinkAccount: func.isRequired,
    linkAccount: func.isRequired,
    linkingProvider: authIdPropTypes,
  }

  render() {
    const {
      user,
      unlinkAccount,
      linkAccount,
      linkingProvider,
      ...props
    } = this.props
    const providerData = prop('providerData', user)

    return (
      <MenuPage title="Edit Profile" {...props}>
        {!user ? (
          <div>Loading...</div>
        ) : (
          <Fragment>
            <ProfilePageContent>
              <SectionHeading>Accounts</SectionHeading>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {mapObjAsArray(auth => {
                  const { id } = auth
                  const linked = containsBy(
                    d => d.providerId === id,
                    providerData,
                  )
                  const clickFn = linked ? unlinkAccount : linkAccount
                  return (
                    <SignInButton
                      key={id}
                      onClick={() => clickFn(id)}
                      linking={linkingProvider === id}
                      {...{ auth, linked }}
                    />
                  )
                }, authProviders)}
              </div>
            </ProfilePageContent>
          </Fragment>
        )}
      </MenuPage>
    )
  }
}

export default EditProfile
