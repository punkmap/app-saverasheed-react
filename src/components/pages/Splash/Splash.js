import React, { Component } from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'

import loadingData from '../../../assets/Loading'
import loadingImg from '../../../assets/Loading.png'
import Spritesheet from '../../atoms/Spritesheet/Spritesheet'
import { size } from '../../../util/ramda-extra'

import Page from '../../templates/Page'

const { func, any, bool } = PropTypes

const LoaderRoot = styled(Page)({
  padding: 25,
  justifyContent: 'space-around',
  width: '100%',
  height: '100%',
  color: 'white',
  alignItems: 'center',
  textAlign: 'center',
})

const LoadingWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '30px 0',
})

const LoadingContainer = styled('div')({
  margin: '15px 0',
})

const facts = [
  `Rasheed's favorite pizza is buffalo blue cheese! 🍕`,
  `Rasheed has been growing his beard since Nov 2017!`,
  `Rasheed oils, balms, and brushes his beard every morning and evening!`,
]

const randomNth = coll => Math.floor(Math.random() * size(coll))

export class Loading extends Component {
  state = { counter: randomNth(facts) }

  componentDidMount() {
    this.interval = setInterval(
      () =>
        this.setState(({ counter }) => {
          let newCounter = randomNth(facts)
          while (newCounter === counter) newCounter = randomNth(facts)
          return {
            counter: newCounter,
          }
        }),
      5000,
    )
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const { counter } = this.state
    const fact = facts[counter]

    return (
      <LoaderRoot>
        <LoadingWrapper>
          <LoadingContainer>
            <Spritesheet
              src={loadingImg}
              data={loadingData}
              stageWidth={window.innerWidth - 50}
            />
          </LoadingContainer>
          <LoadingContainer>Loading...</LoadingContainer>
        </LoadingWrapper>
        <LoadingWrapper>
          <LoadingContainer>Did you know?</LoadingContainer>
          <LoadingContainer>{fact}</LoadingContainer>
        </LoadingWrapper>
      </LoaderRoot>
    )
  }
}

const Splash = ({ error, retry, pastDelay }) => {
  if (error) {
    return (
      <div>
        Error! <button onClick={retry}>Retry</button>
      </div>
    )
  }

  if (pastDelay) {
    return <Loading />
  }

  return null
}

Splash.propTypes = {
  error: any,
  retry: func,
  pastDelay: bool,
}

export default Splash
