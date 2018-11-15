export const baseIpfsUrl = 'https://ipfs.xyo.network/ipfs'

export const middleware = xya => store => next => action => next(action)

export default middleware
