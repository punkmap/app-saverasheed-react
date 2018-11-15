import React from 'react'
import { shallow } from 'enzyme'
import MenuPage from '.'

const wrap = (props = {}) => shallow(<MenuPage {...props} />)

/*
title: string.isRequired,
  children: any,
  className: string,
  location: shape({
    pathname: string.isRequired,
  }).isRequired,
  history: shape({
    push: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
 */

describe('MenuPage', () => {
  it('renders without crashing', () => {
    const wrapper = wrap({
      title: 'Menu Page',
      children: '',
      className: '',
      location: {
        pathname: '',
      },
      history: {
        push: jest.fn(),
        goBack: jest.fn(),
      },
    })
    expect(wrapper).toMatchSnapshot()
  })
})
