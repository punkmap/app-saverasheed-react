import { createSelector, createStructuredSelector } from 'reselect'

import { mapKeys } from './ramda-extra'

export const derive = createSelector
export const subscribe = selectors =>
  createStructuredSelector(
    mapKeys(
      key => key.replace(/^get([A-Z])/, (match, x) => x.toLowerCase()),
      selectors,
    ),
  )

export const propSelector = (_, p) => p
