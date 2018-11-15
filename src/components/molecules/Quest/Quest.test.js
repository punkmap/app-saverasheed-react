import React from 'react'
import { shallow } from 'enzyme'

import Quest from '.'
import { quest } from '../../../fixtures/quests'

const wrap = (props = {}) => shallow(<Quest {...props} />)

describe('Quest', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({ quest, idx: 1, selectQuest: jest.fn() })
    expect(wrapper).toMatchSnapshot()
  })
})
