import { flatMap } from '../util/ramda-extra'

const req = require.context('.', true, /\.\/.+\/(dataloaders)\.js$/)

const dataloaders = flatMap(key => req(key).default, req.keys())

export default dataloaders
