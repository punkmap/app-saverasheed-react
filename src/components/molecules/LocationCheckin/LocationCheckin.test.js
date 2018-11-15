import React from 'react'
import { shallow } from 'enzyme'
import LocationCheckin from '.'
import { poi1 } from '../../../fixtures/pois'
import { quest } from '../../../fixtures/quests'

const wrap = (props = {}) => shallow(<LocationCheckin {...props} />)

describe('LocationCheckin', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({
      confirmCheckin: jest.fn(),
      closePopup: jest.fn(),
      poi: poi1,
      quest,
      userQuadkey: '01',
    })
    expect(wrapper).toMatchSnapshot()
  })
})
