import { reduce, assoc } from 'ramda'
import { camelCase } from 'change-case'

const req = require.context('.', true, /\.\/.+\/(reducer)\.js$/)

const reducers = reduce(
  (acc, key) => {
    const storeName = camelCase(key.replace(/\.\/(.+)\/.+$/, '$1'))
    const reducer = req(key).default
    return assoc(storeName, reducer, acc)
  },
  {},
  req.keys(),
)

export default reducers
