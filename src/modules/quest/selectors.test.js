import { merge } from 'ramda'
import { quest } from '../../fixtures/quests'
import { user1 } from '../../fixtures/users'
import { getLocationsLeft } from './selectors'

const defaultState = { auth: {}, quest: {} }
const createState = merge(defaultState)

describe('getLocationsLeft', () => {
  it('getLocationsLeft with user set', () => {
    const state = createState({
      auth: { user: user1 },
      quest: { quest },
    })
    expect(getLocationsLeft(state)).toBe(3)
  })
})
