import React from 'react'
import { shallow } from 'enzyme'
import LocationDetail from '.'
import { poi1 } from '../../../fixtures/pois'

const wrap = (props = {}) => shallow(<LocationDetail {...props} />)

const popupInfo = {
  name: poi1.name,
  description: poi1.description,
  hint: poi1.hint,
}

describe('LocationDetail', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({
      closePopup: jest.fn(),
      popupInfo,
    })
    expect(wrapper).toMatchSnapshot()
  })
})
