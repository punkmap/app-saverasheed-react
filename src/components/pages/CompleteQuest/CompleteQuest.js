import React, { Component } from 'react'
import styled, { css } from 'react-emotion'
import PropTypes from 'prop-types'
import { portisAuth } from '../../../fixtures/authProviders'
import { COMPLETED, PENDING, questPropTypes } from '../../../fixtures/quests'
import { baseIpfsUrl } from '../../../modules/quest/middleware'

import muiTheme from '../../../theme'
import Button from '../../atoms/Button/Button'
import ButtonLink from '../../atoms/ButtonLink/ButtonLink'
import SignInButton from '../../atoms/SignInButton/SignInButton'
import MenuPage from '../../templates/MenuPage'

const { number, bool, string, shape } = PropTypes

const {
  palette: {
    primary: { main: primaryMain },
    blue: { main: blueMain },
  },
} = muiTheme

const mainPageCx = css({
  display: 'flex',
  flex: 1,
})

const QuestDetail = styled('div')(
  {
    flex: 1,
    position: 'relative',
    textAlign: 'center',
  },
  ({ flex }) =>
    flex && {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
)

const Congrats = styled('div')({
  color: primaryMain,
  textAlign: 'center',
  fontSize: 28,
  marginTop: 20,
  marginBottom: 20,
  zIndex: 1,
})

const btnCx = css({
  color: primaryMain,
  background: blueMain,
  padding: 10,
  margin: 'auto',
})

const Token = styled('img')({
  // 371.42 429.27
  width: 371.42 / 2.2,
  height: 429.27 / 2.2,
})

class CompleteQuest extends Component {
  static propTypes = {
    loading: bool,
    locationsLeft: number,
    query: shape({
      hash: string,
    }),
    questWithStatus: questPropTypes.isRequired,
    userAddress: string,
  }

  render() {
    const {
      loading,
      completeQuest,
      query,
      questWithStatus: { tokens, status } = {},
      userAddress,
      linkAccount,
      linkingProvider,
      ...props
    } = this.props

    const defaultTokenImg = tokens[0].image

    return (
      <MenuPage {...props} noNav title="Quest Complete!" className={mainPageCx}>
        {loading ? (
          <div>Loading...</div>
        ) : status !== PENDING ? (
          <QuestDetail flex>
            <div>
              {status === COMPLETED
                ? 'Your quest is already complete!'
                : 'Your quest is not complete yet!'}
            </div>
            <ButtonLink btnClassName={btnCx} to="/">
              Back to Map
            </ButtonLink>
          </QuestDetail>
        ) : (
          <QuestDetail>
            <Congrats>Congratulations!! You Saved Rasheed!</Congrats>
            <Token src={`${baseIpfsUrl}/${defaultTokenImg}`} />
            <p>You earned a hero token!</p>
            <p>
              A Hero Token is a rare, Non-Fungible Token (NFT). A limited number
              can be redeemed for prizes at Spatial 2018!
            </p>
            <p>Future quests will have tokens, but none like this!</p>
            {userAddress ? (
              <Button
                className={btnCx}
                onClick={() => completeQuest(query.hash)}
              >
                Claim Token
              </Button>
            ) : (
              <div>
                You don't seem to have an address associated with this account.
                <SignInButton
                  onClick={linkAccount}
                  auth={portisAuth}
                  linking={linkingProvider === 'portis'}
                />
              </div>
            )}
          </QuestDetail>
        )}
      </MenuPage>
    )
  }
}

export default CompleteQuest
