import { map } from 'ramda'

const req = require.context('.', true, /\.\/.+\/(middleware)\.js$/)

const middlewares = map(key => req(key).default, req.keys())

export default middlewares
