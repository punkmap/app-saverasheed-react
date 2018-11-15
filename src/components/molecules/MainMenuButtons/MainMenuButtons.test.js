import React from 'react'
import { shallow } from 'enzyme'

import MainMenuButtons from '.'

const wrap = (props = {}) => shallow(<MainMenuButtons {...props} />)

const topButtonAnimDelay = 0
const topButtonAnimDuration = 1000

const bottomButtonAnimDelay = topButtonAnimDelay + topButtonAnimDuration
const bottomButtonAnimDuration = 1000

const topAnim = {
  duration: topButtonAnimDuration,
  delay: topButtonAnimDelay,
}

const bottomAnim = {
  duration: bottomButtonAnimDuration,
  delay: bottomButtonAnimDelay,
}

const props = { topAnim, bottomAnim }

describe('MainMenuButtons', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap(props)
    expect(wrapper).toMatchSnapshot()
  })
})
