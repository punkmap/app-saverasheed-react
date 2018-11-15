import IPFS from 'ipfs-mini'
import { contains, startsWith, prop, concat, uniqBy, append } from 'ramda'
import { push } from 'connected-react-router'
import { toast } from 'react-toastify'

import { getProviderById } from '../../fixtures/authProviders'
import { COMPLETED } from '../../fixtures/quests'
import { saveState } from '../../util/localStorage'
import { subscribe } from '../../util/reselect'
import { getPathname } from '../common/selectors'
import { getQuestWithStatus } from '../quest/selectors'
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
  FETCH_USER_DATA_SUCCESS,
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

noop(noop)

const authAxns = [AUTHENTICATE_REQUEST]
const linkAxns = [LINK_EXISTING_ACCOUNT_REQUEST]

export const authenticateUser = (store, user) => {
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
  store.dispatch(authenticateSuccess(userData))
}

const accountExistsMiddleware = async (
  store,
  xya,
  { credential: pendingCred, email },
) => {
  // User's email already exists.
  const methods = await xya.fetchSignInMethodsForEmail(email)
  // If the user has several sign-in methods,
  // the first method in the list will be the "recommended" method to use.
  const method = methods[0]
  store.dispatch(updateLinkedAccount(method, pendingCred, email))
  store.dispatch(push('/main/link'))
}

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

const authMiddleware = async (
  store,
  xya,
  { type, authType, email, password },
) => {
  try {
    if (type === 'password') {
      const method = authType === 'signin' ? 'signIn' : 'signUp'
      const userRes = await xya[method](email, password)
      console.log('auth with password success', { userRes })
      authenticateUser(store, userRes.user)
    } else if (type === 'portis') {
      await portisAuth(async (err, res, message, address, email) => {
        if (err) {
          return store.dispatch(authenticateFailure(err.message))
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
          authenticateUser(store, {
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
          })
        } catch (error) {
          if (error.code === 'auth/email-already-in-use') {
            await accountExistsMiddleware(store, xya, {
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
      return authenticateUser(store, res.user)
    }
  } catch (error) {
    if (error.code === 'auth/account-exists-with-different-credential') {
      await accountExistsMiddleware(store, xya, error)
    } else {
      store.dispatch(authenticateFailure(error.message))
    }
  }
}

const linkEmailAccountMiddleware = async (store, xya, { email, password }) => {
  try {
    const { pendingCred } = subscribe({ getPendingCred })(store.getState())
    const userRes = await xya.signIn(email, password)
    const userCred = await userRes.user.linkAndRetrieveDataWithCredential(
      pendingCred,
    )
    authenticateUser(store, userCred.user)
  } catch (error) {
    console.error(error)
    store.dispatch(authenticateFailure(error.message))
  }
}

const linkExistingAccountMiddleware = async (store, xya) => {
  try {
    const { method, pendingCred } = subscribe({
      getMethod,
      getPendingCred,
    })(store.getState())
    if (method === 'password') {
      return store.dispatch(push('/main/link/email'))
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

      authenticateUser(store, userCred.user)
    }
  } catch (error) {
    console.error(error)
    store.dispatch(authenticateFailure(error.message))
  }
}

const linkAccountMiddleware = async (store, xya, { providerId }) => {
  try {
    if (providerId === 'portis') {
      await portisAuth(async (err, res, message, address) => {
        if (err) {
          throw err
        }
        await xya.addWallet(address)
        await xya.updateUser({ address })
        const { providerData, email } = await xya.currentUser()
        store.dispatch(
          linkAccountSuccess([
            ...providerData,
            {
              displayName: null,
              email,
              phoneNumber: null,
              photoURL: null,
              providerId: 'portis',
              uid: address,
            },
          ]),
        )
      })
      return
    }
    const {
      user: { providerData },
    } = await xya.linkAccount(providerId)
    const address = getUserAddress(store.getState())
    const userData = mergeAllWithNil(providerData)
    const { displayName, photoURL, email } = userData
    await xya.updateProfile({ displayName, photoURL })

    const pData = address
      ? [
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
      : providerData
    store.dispatch(linkAccountSuccess(pData))
  } catch (err) {
    console.error(err)
    store.dispatch(linkAccountFailure(err.message))
  }
}

const unlinkAccountMiddleware = async (store, xya, { providerId }) => {
  try {
    const address = getUserAddress(store.getState())
    if (providerId === 'portis') {
      if (address) {
        await xya.removeWallet(address)
        await xya.updateUser({ address: null })
        const { providerData } = await xya.currentUser()
        store.dispatch(unlinkAccountSuccess(providerData))
      }
      return
    }
    const { providerData } = await xya.unlinkAccount(providerId)
    const userData = mergeAllWithNil(providerData)
    const { displayName, photoURL, email } = userData
    await xya.updateProfile({ displayName, photoURL })
    const pData = address
      ? [
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
      : providerData
    store.dispatch(unlinkAccountSuccess(pData))
  } catch (err) {
    console.error(err)
    store.dispatch(unlinkAccountFailure())
  }
}

const shownIntro = async (store, xya) => {
  try {
    await xya.updateUser({
      shownIntro: true,
    })
    saveState('shownIntro', true)
    store.dispatch(shownIntroSuccess())
  } catch (err) {
    console.error(err)
    store.dispatch(shownIntroFailure(err.message))
  }
}

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

const confirmCheckin = async (store, xya, { poi, userQuadkey }) => {
  try {
    const state = store.getState()
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
        node.addJSON(json, (err, hash) => (err ? reject(err) : resolve(hash))),
      )

    const checkinHash = await addJSON(checkinJSON)
    await xya.saveCheckinData({ checkinHash, questDataHash, createdAt })
    store.dispatch(confirmCheckinSuccess(newCheckins))
    if (newCheckins.length === questCheckins.length) {
      // player is done with quest!
      store.dispatch(push(`/complete-quest?hash=${checkinHash}`))
    } else {
      store.dispatch(push('/checkin-success'))
    }
  } catch (err) {
    console.error(err)
    store.dispatch(confirmCheckinFailure(err.message))
  }
}

const logoutUser = async (store, xya) => {
  try {
    await xya.signOut()
    store.dispatch(logoutSuccess())
    store.dispatch(push('/main'))
  } catch (err) {
    console.error(err)
    store.dispatch(logoutFailure(err.message))
  }
}

const middleware = xya => store => {
  return next => {
    return async action => {
      if (contains(action.type, authAxns)) {
        next(action)
        await authMiddleware(store, xya, action.payload)
      } else if (contains(action.type, linkAxns)) {
        next(action)
        await linkExistingAccountMiddleware(store, xya)
      } else if (contains(action.type, [LINK_ACCOUNT_REQUEST])) {
        next(action)
        await linkAccountMiddleware(store, xya, action.payload)
      } else if (contains(action.type, [LINK_EMAIL_REQUEST])) {
        next(action)
        await linkEmailAccountMiddleware(store, xya, action.payload)
      } else if (contains(action.type, [UNLINK_ACCOUNT_REQUEST])) {
        next(action)
        await unlinkAccountMiddleware(store, xya, action.payload)
      } else if (contains(action.type, [SHOWN_INTRO_REQUEST])) {
        next(action)
        await shownIntro(store, xya)
      } else if (contains(action.type, [CONFIRM_CHECKIN_REQUEST])) {
        next(action)
        await confirmCheckin(store, xya, action.payload)
      } else if (contains(action.type, [FETCH_USER_DATA_SUCCESS])) {
        next(action)
        if (startsWith('/main', getPathname(store.getState()))) {
          store.dispatch(push('/'))
        }
      } else if (contains(action.type, [LOGOUT_REQUEST])) {
        next(action)
        await logoutUser(store, xya)
      } else {
        return next(action)
      }
    }
  }
}

export default middleware
