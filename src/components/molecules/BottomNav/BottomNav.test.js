import React from 'react'
import { shallow } from 'enzyme'

import BottomNav from '.'
import { sampleLocation } from '../../../fixtures/router'

const wrap = (props = {}) => shallow(<BottomNav {...props} />)

describe('BottomNav', () => {
  it('renders without crashing', () => {
    const wrapper = wrap({
      location: sampleLocation,
      activeQuestSlug: 'foo-bar',
    })
    expect(wrapper).toMatchSnapshot()
  })
})
