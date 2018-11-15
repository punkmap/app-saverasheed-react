import React from 'react'
import ReactDOM from 'react-dom'
import { injectGlobal } from 'emotion'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import 'typeface-aldrich'
import 'react-toastify/dist/ReactToastify.css'
import * as Sentry from '@sentry/browser'

import loadingImg from './assets/Loading.png'
import theme from './theme'
import * as serviceWorker from './registerServiceWorker'
import configureStore, { history } from './modules/configureStore'
import App from './App'

Sentry.init({
  dsn: 'https://6f29f519270c4558ae7cd7ac5f0ca6b7@sentry.io/1318124',
})

// preload loading img
const img = new Image()
img.src = loadingImg

injectGlobal({
  html: {
    boxSizing: 'border-box',
    fontFamily: 'Aldrich, "Roboto", "Helvetica", "Arial", sans-serif',
    height: '100%',
  },
  body: {
    margin: 0,
    height: '100%',
  },
  '*, *:before, *:after': {
    boxSizing: 'inherit',
    fontFamily: 'inherit',
  },
  '#root': {
    height: '100%',
    width: '100vw',
    // overflow: 'hidden',
  },
})

const store = configureStore()

setTimeout(() => {
  const height = window.innerHeight
  const viewport = document.querySelector('meta[name=viewport]')
  const initialContent = viewport.getAttribute('content')
  viewport.setAttribute('content', `${initialContent}, height=${height}px`)
}, 300)

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root'),
)

serviceWorker.unregister()
// serviceWorker.register()
