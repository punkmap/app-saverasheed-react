import React, { Fragment, Component } from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import Loadable from 'react-loadable'
import { connect } from 'react-redux'
import { startsWith } from 'ramda'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import { ToastContainer } from 'react-toastify'
import * as Sentry from '@sentry/browser'

import {
  getIsLoading,
  getIsLoggedIn,
  getShowIntro,
} from './modules/auth/selectors'
import { getAppLoading, getShowingSplash } from './modules/common/selectors'
import { subscribe } from './util/reselect'
import Intro from './containers/Intro'
import Splash, { Loading } from './components/pages/Splash'

const { bool, any } = PropTypes

const createLoadable = args =>
  Loadable({ loading: Splash, delay: 300, ...args })

export const AsyncMain = createLoadable({
  loader: () => import('./components/pages/MainMenu'),
})

export const AsyncHome = createLoadable({
  loader: () => import('./containers/HomePage'),
})

const AsyncProfile = createLoadable({
  loader: () => import('./containers/Profile'),
})

const AsyncEditProfile = createLoadable({
  loader: () => import('./containers/EditProfile'),
})

const AsyncQuestLog = createLoadable({
  loader: () => import('./containers/QuestLog'),
})

const AsyncQuestRoute = createLoadable({
  loader: () => import('./containers/QuestRoute'),
})

const AsyncCheckinSuccess = createLoadable({
  loader: () => import('./containers/CheckinSuccess'),
})

const AsyncCompleteQuest = createLoadable({
  loader: () => import('./containers/CompleteQuest'),
})

class ErrorBoundary extends Component {
  static propTypes = {
    children: any,
  }
  state = {
    error: null,
    errorInfo: null,
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
    })
    // You can also log error messages to an error reporting service here
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key])
      })
      Sentry.captureException(error)
    })
  }

  render() {
    if (this.state.error) {
      // render fallback UI
      return <button onClick={() => Sentry.showReportDialog()}>Report feedback</button>
    } else {
      // when there's not an error, render children untouched
      return this.props.children
    }
  }
}

class App extends Component {
  static propTypes = {
    showingSplash: bool,
    isLoggedIn: bool,
    showIntro: bool,
    appLoading: bool,
    // authLoading: bool,
  }

  render() {
    const {
      showingSplash,
      appLoading,
      isLoggedIn,
      showIntro,
      // authLoading,
    } = this.props

    return (
      <ErrorBoundary>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
        {showingSplash || appLoading ? (
          <Loading />
        ) : (
          <Fragment>
            <Route
              path="/"
              render={({ match, location: { pathname } }) => {
                if (startsWith('/main', pathname)) {
                  return null
                }

                return isLoggedIn ? (
                  <AsyncHome isExact={match.isExact} />
                ) : (
                  <Redirect to="/main" exact from="/" />
                )
              }}
            />
            <Switch>
              <Route path="/main" component={AsyncMain} />
              <Route path="/profile" exact component={AsyncProfile} />
              <Route path="/profile/edit" exact component={AsyncEditProfile} />
              <Route path="/quest-log" exact component={AsyncQuestLog} />
              <Route
                path="/checkin-success"
                exact
                component={AsyncCheckinSuccess}
              />
              <Route
                path="/complete-quest"
                exact
                component={AsyncCompleteQuest}
              />
              <Route
                path="/quest-log/:questSlug"
                exact
                component={AsyncQuestRoute}
              />
            </Switch>
            {/*{isLoggedIn && showIntro && <Intro />}*/}
            <Intro run={isLoggedIn && showIntro} />
          </Fragment>
        )}
      </ErrorBoundary>
    )
  }
}

const mapStateToProps = subscribe({
  getIsLoggedIn,
  getShowIntro,
  getShowingSplash,
  getAppLoading,
  getAuthLoading: getIsLoading,
})

export default compose(
  withRouter,
  connect(mapStateToProps),
)(App)
