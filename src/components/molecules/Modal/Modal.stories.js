import React, { Component, Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import Modal from '.'

class ModalStoryOn extends Component {
  state = { open: false }

  render() {
    const { open } = this.state
    return (
      <Fragment>
        <button onClick={() => this.setState({ open: true })}>Open!</button>
        <Modal
          isLocationAllowed
          on={open}
          onClick={() => this.setState({ open: false })}
        >
          <div>Testing the modal!</div>
          <div>Testing the modal!</div>
          <div>Testing the modal!</div>
        </Modal>
      </Fragment>
    )
  }
}

class ModalStoryOff extends Component {
  state = { open: true }

  render() {
    const { open } = this.state
    return (
      <Fragment>
        <button onClick={() => this.setState({ open: true })}>Open!</button>
        <Modal
          isLocationAllowed
          on={open}
          onClick={() => this.setState({ open: false })}
        >
          <div>Testing the modal!</div>
          <div>Testing the modal!</div>
          <div>Testing the modal!</div>
        </Modal>
      </Fragment>
    )
  }
}

storiesOf('Modal', module)
  .add('on', () => <ModalStoryOn />)
  .add('off', () => <ModalStoryOff />)
