import React, { Component, Fragment } from 'react'
import styled, { css } from 'react-emotion'
import PropTypes from 'prop-types'
import { map } from 'ramda'
import { baseIpfsUrl } from '../../../fixtures/ipfs'

import {
  completedQuestPropTypes,
  questPropTypes,
} from '../../../fixtures/quests'
import { userPropTypes } from '../../../fixtures/users'
import theme from '../../../theme'
import { reduceObj } from '../../../util/ramda-extra'
import A from '../../atoms/A'
import Button from '../../atoms/Button'
import { ButtonLink } from '../../atoms/ButtonLink'
import MenuPage from '../../templates/MenuPage'
import profile from '../../../assets/UI_NAV_Btn-Profile.svg'

const { func, arrayOf, string } = PropTypes

const {
  palette: {
    primary: { main: primaryMain },
    tertiary: { dark: darkTertiary },
  },
} = theme

const ProfilePageContent = styled('div')({})

const UserInfo = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

const Avatar = styled('img')({
  width: 96,
  height: 96,
  marginBottom: 10,
  border: `solid 2px ${primaryMain}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
  fontSize: '1.25rem',
  flexShrink: 0,
  userSelect: 'none',
  borderRadius: '50%',
})

const SectionHeading = styled('h3')({
  padding: '2px 5px',
  display: 'inline-block',
  borderBottom: `solid 2px ${primaryMain}`,
})

const Buttons = styled('div')({
  marginTop: 30,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

const EtherScanButton = styled(Button)({
  padding: '10px 30px',
  backgroundColor: 'red',
  marginBottom: 30,
  border: `solid 2px ${primaryMain}`,
})

const LogoutButton = styled(Button)({
  padding: '10px 30px',
  backgroundColor: 'transparent',
  border: 'solid 2px gray',
  color: 'gray',
})

const editProfileButtonCx = css({
  marginTop: 10,
  padding: '10px 30px',
  backgroundColor: 'transparent',
  border: 'solid 2px gray',
  color: 'gray',
})

const Token = styled('img')({
  width: 96,
  height: 96,
})

class Profile extends Component {
  static propTypes = {
    user: userPropTypes,
    pendingQuests: arrayOf(questPropTypes),
    completedQuests: arrayOf(completedQuestPropTypes),
    logout: func.isRequired,
    checkinHash: string,
  }

  render() {
    const {
      user,
      logout,
      pendingQuests,
      completedQuests,
      push,
      checkinHash,
      ...props
    } = this.props
    // console.log({ pendingQuests, completedQuests })

    return (
      <MenuPage title="Profile" {...props}>
        {!user ? (
          <div>Loading...</div>
        ) : (
          <Fragment>
            <UserInfo>
              <Avatar
                alt={user.displayName || 'User'}
                src={user.photoURL || profile}
              />
              {user.displayName && <div>{user.displayName}</div>}
              <div>{user.email}</div>
              <ButtonLink btnClassName={editProfileButtonCx} to="/profile/edit">
                Edit Profile
              </ButtonLink>
            </UserInfo>
            <ProfilePageContent>
              <SectionHeading>Stats</SectionHeading>
              <div
                className={css({
                  backgroundColor: primaryMain,
                  padding: 10,
                  color: darkTertiary,
                  borderRadius: 5,
                })}
              >
                <div>
                  Quests completed: {(user.completedQuests || []).length}
                </div>
                <div>
                  Locations confirmed:{' '}
                  {reduceObj(
                    (acc, v) => acc + v.length,
                    0,
                    user.checkins || {},
                  )}
                </div>
              </div>
              <SectionHeading>Tokens</SectionHeading>
              <div>
                {map(
                  ({ tokens, id, name }) => (
                    <Token
                      key={id}
                      alt={name}
                      src={`${baseIpfsUrl}/${tokens[0].image}`}
                      onClick={() => push(`/complete-quest/${checkinHash}`)}
                    />
                  ),
                  pendingQuests,
                )}
                {map(
                  ({ questData, token: { name, image } }) => (
                    <Token
                      key={questData}
                      alt={name}
                      src={`${baseIpfsUrl}/${image}`}
                    />
                  ),
                  completedQuests,
                )}
              </div>
              <Buttons>
                {user.address ? (
                  <A
                    href={`https://etherscan.io/address/${
                      user.address
                      }#tokentxnsErc721`}
                    target="_blank"
                  >
                    <EtherScanButton>View Tokens on Etherscan</EtherScanButton>
                  </A>
                ) : (
                  <div>Please link an address</div>
                )}
                <LogoutButton onClick={logout}>Logout</LogoutButton>
              </Buttons>
            </ProfilePageContent>
          </Fragment>
        )}
      </MenuPage>
    )
  }
}

export default Profile
