import React from 'react'
import { shallow } from 'enzyme'
import Intro from '.'

const wrap = (props = {}) => shallow(<Intro {...props} />)

describe('Intro', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({
      push: jest.fn(),
      selectQuest: jest.fn(),
      shownIntro: jest.fn(),
    })
    expect(wrapper).toMatchSnapshot()
  })
})
