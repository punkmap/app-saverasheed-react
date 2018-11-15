import { merge } from 'ramda'
import { user1, user2 } from '../../fixtures/users'
import {
  initialState,
  handleAuthenticateSuccess,
  handleUpdateLinkedAccount,
} from './reducer'

const createState = merge(initialState)

describe('handlers', () => {
  describe('handleAuthenticateSuccess', () => {
    it('sets users properly', () => {
      const state = createState()
      expect(
        handleAuthenticateSuccess(state, { payload: { user: user1 } }),
      ).toEqual({
        user: user1,
        hideIntro: false,
        loading: false,
      })
      expect(
        handleAuthenticateSuccess(state, { payload: { user: user2 } }),
      ).toEqual({
        user: user2,
        hideIntro: false,
        loading: false,
      })
    })
  })

  describe('handleUpdateLinkedAccount', () => {
    it('sets properly', () => {
      const state = createState()

      expect(
        handleUpdateLinkedAccount(state, {
          payload: {
            email: 'rasheed.bustamam@gmail.com',
            pendingCred: 'facebook.com',
            method: 'google.com',
          },
        }),
      ).toEqual({
        email: 'rasheed.bustamam@gmail.com',
        pendingCred: 'facebook.com',
        method: 'google.com',
        loading: false,
      })
    })
  })
})
