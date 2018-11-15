import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'react-emotion'
import ScreenEffect from '.'

const ScreenEffectRoot = styled('div')({
  height: '100%',
  width: '100vw',
  background: '#111',
  color: 'white',
  padding: 20,
})

const Switch = styled('input')({
  display: 'none',
})

const Label = styled('label')(
  {
    display: 'inline-block',
    cursor: 'pointer',
    background: '#fff',
    color: '#111',
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    marginTop: 10,
    boxShadow: '0 2px #666',
    '&::before': {
      content: '" "',
      display: 'inline-block',
      borderRadius: '100%',
      width: 10,
      height: 10,
      background: '#003321',
      marginRight: 10,
      border: '1px solid #111',
    },
  },
  ({ active }) =>
    active && {
      '&::before': {
        background: '#2f5',
      },
    },
)

class ScreenEffectStory extends Component {
  state = { on: this.props.on }

  render() {
    const { on } = this.state
    return (
      <ScreenEffectRoot>
        <Switch
          type="checkbox"
          id="switch"
          checked={on}
          onChange={() => this.setState(({ on }) => ({ on: !on }))}
        />
        <Label htmlFor="switch" active={on}>
          Turn {on ? 'off' : 'on'}
        </Label>
        <ScreenEffect on={on}>foo bar bin baz</ScreenEffect>
      </ScreenEffectRoot>
    )
  }
}

class ScreenEffectChildrenStory extends Component {
  state = { on: true }

  render() {
    const { on } = this.state
    return (
      <ScreenEffectRoot>
        <Switch
          type="checkbox"
          id="switch"
          checked={on}
          onChange={() => this.setState(({ on }) => ({ on: !on }))}
        />
        <Label htmlFor="switch" active={on}>
          Turn {on ? 'off' : 'on'}
        </Label>
        <ScreenEffect on={on}>
          <img src="https://placekitten.com/g/600/600" />
        </ScreenEffect>
      </ScreenEffectRoot>
    )
  }
}

storiesOf('ScreenEffect', module)
  .add('on', () => <ScreenEffectStory on />)
  .add('off', () => <ScreenEffectStory />)
  .add('with complex children', () => <ScreenEffectChildrenStory />)
