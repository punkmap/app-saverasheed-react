import IPFS from 'ipfs-mini'
import axios from 'axios'
import {
  groupBy,
  mapObjIndexed,
  pipe,
  prop,
  map,
  // head,
  last,
  pathOr,
  sortBy,
  assoc,
  omit,
  concat,
  uniqBy,
  append,
} from 'ramda'
import { createLoader, fixedWait } from 'redux-dataloader'
import { push } from 'connected-react-router'
import { toast } from 'react-toastify'

import { COMPLETED } from '../../fixtures/quests'
import { getProviderById } from '../../fixtures/authProviders'
import { saveState } from '../../util/localStorage'
import { subscribe } from '../../util/reselect'
import { getQuestWithStatus, getActiveQuestHash } from '../quest/selectors'
import {
  LINK_EXISTING_ACCOUNT_REQUEST,
  updateLinkedAccount,
  AUTHENTICATE_REQUEST,
  authenticateFailure,
  authenticateSuccess,
  SHOWN_INTRO_REQUEST,
  shownIntroFailure,
  shownIntroSuccess,
  CONFIRM_CHECKIN_REQUEST,
  confirmCheckinSuccess,
  confirmCheckinFailure,
  // FETCH_USER_DATA_SUCCESS,
  LOGOUT_REQUEST,
  logoutFailure,
  logoutSuccess,
  UNLINK_ACCOUNT_REQUEST,
  unlinkAccountSuccess,
  unlinkAccountFailure,
  linkAccountSuccess,
  linkAccountFailure,
  LINK_ACCOUNT_REQUEST,
  LINK_EMAIL_REQUEST,
} from './actions'
import {
  getMethod,
  getPendingCred,
  getUserAddress,
  getUserCheckins,
} from './selectors'
import { web3 } from '../../util/web3'
import { noop, toHex, mergeAllWithNil } from '../../util/ramda-extra'
import {
  FETCH_USER_DATA_REQUEST,
  fetchUserDataSuccess,
  fetchUserDataFailure,
  COMPLETE_QUEST_REQUEST,
  completeQuestFailure,
  completeQuestSuccess,
} from './actions'

export const authenticateUser = (user, dispatch) => {
  if (!user) {
    return console.log('no user')
  }
  const {
    displayName,
    email,
    emailVerified,
    photoURL,
    isAnonymous,
    uid,
    providerData,
  } = user
  const userData = {
    displayName,
    email,
    emailVerified,
    photoURL,
    isAnonymous,
    uid,
    providerData,
  }
  const wrapper = dispatch || (i => i)
  return wrapper(authenticateSuccess(userData))
}

const fetchUserDataLoader = createLoader(
  FETCH_USER_DATA_REQUEST,
  {
    success: (context, result) => fetchUserDataSuccess(result),
    error: (context, error) => fetchUserDataFailure(error.message),
    fetch: async ({ dispatch, getState, xya, xyoIpfsUrl }) => {
      const userData = omit(['checkins'], await xya.getUserData())

      const checkinData = await xya.getCheckinData()
      const checkinHashes = pipe(
        groupBy(prop('questDataHash')),
        mapObjIndexed(
          pipe(
            sortBy(x =>
              pathOr(prop('createdAt', x), ['createdAt', 'seconds'])(x),
            ),
            // head,
            last,
            prop('checkinHash'),
          ),
        ),
      )(checkinData)

      // console.log({ userData, checkinData, checkinHashes })
      const activeQuestHash = getActiveQuestHash(getState())

      const currentCheckinHash = checkinHashes[activeQuestHash]
      const getCheckinData = async () => {
        if (currentCheckinHash) {
          const { data } = await axios.get(
            `${xyoIpfsUrl}/${currentCheckinHash}`,
          )
          const { questData, checkinChain } = data
          return { [questData]: checkinChain }
        }
        return {}
      }

      const checkins = await getCheckinData()

      const completedQuestData = await xya.getQuestCompletionData()

      const completedQuests = await Promise.all(
        map(async ({ checkinProofsHash }) => {
          const { data } = await axios.get(`${xyoIpfsUrl}/${checkinProofsHash}`)
          return data
        }, completedQuestData),
      )

      return pipe(
        assoc('checkins', checkins),
        assoc('checkinHash', currentCheckinHash),
        assoc('completedQuests', completedQuests),
      )(userData)
    },
  },
  {
    ttl: 10000,
    retryTimes: 3,
    retryWait: fixedWait(500),
  },
)

const completeQuestDataLoader = createLoader(
  COMPLETE_QUEST_REQUEST,
  {
    success: (ctx, result) => completeQuestSuccess(result),
    error: (ctx, error) => completeQuestFailure(error.message),
    fetch: async ({
      getState,
      dispatch,
      xya,
      xyoIpfsUrl,
      action: {
        payload: { hash },
      },
    }) => {
      const state = getState()
      const hero = getUserAddress(state)
      const quest = getQuestWithStatus(state)
      const { networks, status } = quest
      if (status === COMPLETED) {
        throw new Error('You already got this token!')
      }

      const network = networks[0] // TODO: change

      const completeQuest = xya.app.functions().httpsCallable(`completeQuest`)
      const result = await completeQuest({
        hero,
        checkinProofs: hash,
        network,
      })
      const { earnedToken, checkinProofsHash } = result
      if (earnedToken) {
        /*
          checkinProofsHash: "QmYxgipnYucKe6g7DYQUMsmz5H74prYHCAh5B5PrHkZuyp"
          earnedToken: true
          transactionHash: "0x72c4d6b13d07475fca29070bbe52e5f5882cdf2169809b918caffc4a95a52125"
         */
        const { data: checkinProofs } = await axios.get(
          `${xyoIpfsUrl}/${checkinProofsHash}`,
        )
        return checkinProofs
      } else {
        throw new Error('You already got this token!')
      }
    },
  },
  {
    ttl: 10000,
    retryTimes: 3,
    retryWait: fixedWait(500),
  },
)

const baseMessage = 'Please confirm you wish to login with Portis with address'

const portisAuth = async cb => {
  let email
  web3.currentProvider.on('login', result => {
    email = result.email
  })

  if (web3.currentProvider.isPortis) {
    const accounts = await web3.eth.getAccounts()
    const [address] = accounts
    const message = `${baseMessage} ${address}`
    const data = toHex(message)
    web3.currentProvider.sendAsync(
      {
        id: 1,
        method: 'personal_sign',
        from: address,
        params: [data, address],
      },
      (err, res) => cb(err, res, message, address, email),
    )
  }
}

const accountExistsMiddleware = async (
  dispatch,
  xya,
  { credential: pendingCred, email },
) => {
  // User's email already exists.
  const methods = await xya.fetchSignInMethodsForEmail(email)
  // If the user has several sign-in methods,
  // the first method in the list will be the "recommended" method to use.
  const method = methods[0]
  dispatch(updateLinkedAccount(method, pendingCred, email))
  dispatch(push('/main/link'))
}

const authLoader = createLoader(
  AUTHENTICATE_REQUEST,
  {
    success: (ctx, user) => authenticateUser(user),
    error: ({ dispatch, xya }, error) => {
      if (error.code === 'auth/account-exists-with-different-credential') {
        accountExistsMiddleware(dispatch, xya, error).then(noop)
      } else {
        return authenticateFailure(error.message)
      }
    },
    fetch: async ({
      action: { type, authType, email, password },
      dispatch,
      xya,
    }) => {
      if (type === 'password') {
        const method = authType === 'signin' ? 'signIn' : 'signUp'
        const userRes = await xya[method](email, password)
        console.log('auth with password success', { userRes })
        return userRes.user
      } else if (type === 'portis') {
        await portisAuth(async (err, res, message, address, email) => {
          if (err) {
            return dispatch(authenticateFailure(err.message))
          }
          const { result } = res
          const token = await xya.getTokenFromWallet(message, result)
          const { user } = await xya.signInWithCustomToken(token)
          try {
            await xya.addWallet(address)
            await xya.updateUser({ address })
            await user.updateEmail(email)
            const { providerData = [] } = user
            toast.success('Login successful!')
            return {
              ...user,
              email,
              providerData: uniqBy(
                prop('providerId'),
                concat(providerData, [
                  {
                    displayName: null,
                    email,
                    phoneNumber: null,
                    photoURL: null,
                    providerId: 'portis',
                    uid: address,
                  },
                ]),
              ),
            }
          } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
              await accountExistsMiddleware(dispatch, xya, {
                credential: { providerId: 'portis', address },
                email,
              })
            } else {
              throw error
            }
          }
        })
      } else {
        const { method } = getProviderById(type)
        const res = await xya[method]()
        console.log('auth success!', { res })
        return res.user
      }
    },
  },
  { ttl: 10000, retryTimes: 3, retryWait: fixedWait(500) },
)

const linkExistingAccountLoader = createLoader(
  LINK_EXISTING_ACCOUNT_REQUEST,
  {
    success: (ctx, user) => authenticateUser(user),
    error: (ctx, error) => authenticateFailure(error.message),
    fetch: async ({ dispatch, getState, xya }) => {
      const { method, pendingCred } = subscribe({
        getMethod,
        getPendingCred,
      })(getState())
      if (method === 'password') {
        return dispatch(push('/main/link/email'))
      }

      const oldUser = xya.currentUser()

      const { method: m } = getProviderById(method)
      const result = await xya[m]()
      if (pendingCred.providerId === 'portis') {
        await xya.addWallet(pendingCred.address)
        await xya.updateUser({ address: pendingCred.address })
        await oldUser.delete()
      } else {
        const userCred = await result.user.linkAndRetrieveDataWithCredential(
          pendingCred,
        )
        const userData = mergeAllWithNil(userCred.user.providerData)
        const { displayName, photoURL } = userData

        await xya.updateProfile({ displayName, photoURL })

        return userCred.user
      }
    },
  },
  { ttl: 10000, retryTimes: 3, retryWait: fixedWait(500) },
)

const linkAccountLoader = createLoader(
  LINK_ACCOUNT_REQUEST,
  {
    fetch: async ({
      xya,
      action: {
        payload: { providerId },
      },
      dispatch,
      getState,
    }) => {
      if (providerId === 'portis') {
        await portisAuth(async (err, res, message, address) => {
          if (err) {
            throw err
          }
          await xya.addWallet(address)
          await xya.updateUser({ address })
          const { providerData, email } = await xya.currentUser()
          return [
            ...providerData,
            {
              displayName: null,
              email,
              phoneNumber: null,
              photoURL: null,
              providerId: 'portis',
              uid: address,
            },
          ]
        })
        return
      }
      const {
        user: { providerData },
      } = await xya.linkAccount(providerId)
      const address = getUserAddress(getState())
      const userData = mergeAllWithNil(providerData)
      const { displayName, photoURL, email } = userData
      await xya.updateProfile({ displayName, photoURL })

      return address
        ? append(providerData, {
            displayName: null,
            email,
            phoneNumber: null,
            photoURL: null,
            providerId: 'portis',
            uid: address,
          })
        : providerData
    },
    success: (ctx, pData) => linkAccountSuccess(pData),
    error: (ctx, err) => linkAccountFailure(err.message),
  },
  { ttl: 10000, retryTimes: 3, retryWait: fixedWait(500) },
)

const linkEmailLoader = createLoader(
  LINK_EMAIL_REQUEST,
  {
    fetch: async ({
      getState,
      xya,
      action: {
        payload: { email, password },
      },
    }) => {
      const { pendingCred } = subscribe({ getPendingCred })(getState())
      const userRes = await xya.signIn(email, password)
      const userCred = await userRes.user.linkAndRetrieveDataWithCredential(
        pendingCred,
      )
      return userCred.user
    },
    success: (ctx, user) => authenticateUser(user),
    error: (ctx, err) => authenticateFailure(err.message),
  },
  {
    ttl: 10000,
    retryTimes: 3,
    retryWait: fixedWait(500),
  },
)

const unlinkAccountLoader = createLoader(
  UNLINK_ACCOUNT_REQUEST,
  {
    fetch: async ({
      getState,
      action: {
        payload: { providerId },
      },
      xya,
    }) => {
      const address = getUserAddress(getState())
      if (providerId === 'portis') {
        if (address) {
          await xya.removeWallet(address)
          await xya.updateUser({ address: null })
          const { providerData } = await xya.currentUser()
          return providerData
        }
        return
      }
      const { providerData } = await xya.unlinkAccount(providerId)
      const userData = mergeAllWithNil(providerData)
      const { displayName, photoURL, email } = userData
      await xya.updateProfile({ displayName, photoURL })
      return address
        ? append(providerData, {
            displayName: null,
            email,
            phoneNumber: null,
            photoURL: null,
            providerId: 'portis',
            uid: address,
          })
        : providerData
    },
    success: (ctx, pData) => unlinkAccountSuccess(pData),
    error: (ctx, error) => unlinkAccountFailure(error.message),
  },
  {
    ttl: 10000,
    retryTimes: 3,
    retryWait: fixedWait(500),
  },
)

const shownIntroLoader = createLoader(
  SHOWN_INTRO_REQUEST,
  {
    fetch: async ({ xya }) => {
      await xya.updateUser({
        shownIntro: true,
      })
      saveState('shownIntro', true)
      return true
    },
    success: shownIntroSuccess,
    error: (ctx, error) => shownIntroFailure(error.message),
  },
  {
    ttl: 10000,
    retryTimes: 3,
    retryWait: fixedWait(500),
  },
)

// TODO: fix CORS issue https://github.com/ipfs/js-ipfs-api/issues/61
// const node = new IPFS({
//   host: 'ipfs.xyo.network',
//   port: 5002,
//   protocol: 'https',
// })

const node = new IPFS({
  host: `ipfs.infura.io`,
  port: 5001,
  protocol: `https`,
})

const confirmCheckinLoader = createLoader(
  CONFIRM_CHECKIN_REQUEST,
  {
    fetch: async ({
      xya,
      getState,
      dispatch,
      action: {
        payload: { poi, userQuadkey },
      },
    }) => {
      const state = getState()
      const quest = getQuestWithStatus(state)
      const { hash: questDataHash, checkins: questCheckins, status } = quest
      if (status === COMPLETED) {
        throw new Error('Quest already complete!')
      }
      const oldCheckins = getUserCheckins(state)
      const createdAt = new Date().getTime() // unix milliseconds

      const { id } = poi
      const newCheckins = uniqBy(
        prop('id'),
        append(
          {
            createdAt,
            id,
            quadkey: userQuadkey,
          },
          oldCheckins,
        ),
      )

      const checkinJSON = {
        questData: questDataHash,
        checkinChain: newCheckins,
      }

      const addJSON = async json =>
        new Promise((resolve, reject) =>
          node.addJSON(
            json,
            (err, hash) => (err ? reject(err) : resolve(hash)),
          ),
        )

      const checkinHash = await addJSON(checkinJSON)
      await xya.saveCheckinData({ checkinHash, questDataHash, createdAt })
      dispatch(confirmCheckinSuccess(newCheckins))
      if (newCheckins.length === questCheckins.length) {
        // player is done with quest!
        dispatch(push(`/complete-quest?hash=${checkinHash}`))
      } else {
        dispatch(push('/checkin-success'))
      }
    },
    success: () => {},
    error: (cyx, error) => confirmCheckinFailure(error.message),
  },
  {
    ttl: 10000,
    retryTimes: 3,
    retryWait: fixedWait(500),
  },
)

const logoutLoader = createLoader(
  LOGOUT_REQUEST,
  {
    fetch: async ({ xya, dispatch }) => {
      await xya.signOut()
      dispatch(logoutSuccess())
      dispatch(push('/main'))
    },
    success: () => {},
    error: (ctx, error) => logoutFailure(error.message),
  },
  {
    ttl: 10000,
    retryTimes: 3,
    retryWait: fixedWait(500),
  },
)

export default [
  authLoader,
  completeQuestDataLoader,
  fetchUserDataLoader,
  linkExistingAccountLoader,
  linkAccountLoader,
  linkEmailLoader,
  unlinkAccountLoader,
  shownIntroLoader,
  confirmCheckinLoader,
  logoutLoader,
]
