import { merge } from 'ramda'
import { user1, user2 } from '../../fixtures/users'
import { getUser, getIsLoading, getIsLoggedIn, getShowIntro } from './selectors'

const defaultState = { auth: {} }
const createState = merge(defaultState)

describe('getUser', () => {
  it('getUser with no user set', () => {
    const state = createState()
    expect(getUser(state)).not.toBeDefined()
  })

  it('getUser with user set', () => {
    const state = createState({
      auth: {
        user: user1,
      },
    })
    expect(getUser(state)).toEqual(user1)
  })
})

describe('getIsLoading', () => {
  it('getIsLoading with no loading prop set', () => {
    const state = createState()
    expect(getIsLoading(state)).toBe(false)
  })

  it('getIsLoading with loading prop set', () => {
    const state = createState({
      auth: {
        loading: true,
      },
    })
    expect(getIsLoading(state)).toBe(true)
  })
})

describe('getIsLoggedIn', () => {
  it('getIsLoggedIn with no user set', () => {
    const state = createState()
    expect(getIsLoggedIn(state)).toBe(false)
  })

  it('getIsLoggedIn with user set', () => {
    const state = createState({
      auth: {
        user: user1,
      },
    })
    expect(getIsLoggedIn(state)).toBe(true)
  })
})

describe('getShowIntro', () => {
  it('getShowIntro with no user set', () => {
    const state = createState()
    expect(getShowIntro(state)).toBe(true)
  })

  it('getShowIntro with user who has not seen intro', () => {
    const state = createState({
      auth: {
        user: user2,
      },
    })
    expect(getShowIntro(state)).toBe(true)
  })

  it('getShowIntro with user who has not seen intro but app is loading', () => {
    const state = createState({
      auth: {
        loading: true,
        user: user2,
      },
    })
    expect(getShowIntro(state)).toBe(false)
  })

  it('getShowIntro with user who has seen intro', () => {
    const state = createState({
      auth: {
        user: { ...user1, shownIntro: true },
      },
    })
    expect(getShowIntro(state)).toBe(false)
  })

  it('getShowIntro with user who has seen intro but wants to see it again', () => {
    const state = createState({
      auth: {
        user: user1,
        showingIntro: true,
      },
    })
    expect(getShowIntro(state)).toBe(true)
  })

  it('getShowIntro with user who has seen intro but wants to see it again, but app is loading', () => {
    const state = createState({
      auth: {
        loading: true,
        user: { ...user1, shownIntro: true },
        showingIntro: true,
      },
    })
    expect(getShowIntro(state)).toBe(false)
  })
})
