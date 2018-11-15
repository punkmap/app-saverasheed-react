import React from 'react'
import { shallow } from 'enzyme'
import QuestTitle from '.'
import { quest } from '../../../fixtures/quests'

const wrap = (props = {}) => shallow(<QuestTitle {...props} />)

describe('QuestTitle', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({
      quest,
      push: jest.fn(),
      checkinHash: '',
      userCheckins: [],
    })
    expect(wrapper).toMatchSnapshot()
  })
})
