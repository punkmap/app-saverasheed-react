import Web3 from 'web3'
import { PortisProvider } from 'portis'

export let web3

// memoize the providers
const providers = {}

const createPortisProvider = network => {
  if (providers[network]) {
    return providers[network]
  }
  const provider = new PortisProvider({
    apiKey: 'fcd89c4c2982ea89ceed5a85e449639c',
    network,
    appName: 'SaveRasheed',
    scope: ['email'],
  })
  providers[network] = provider
  return provider
}

export const getWeb3 = () => {
  if (web3) return web3
  // if (typeof window.web3 !== 'undefined') {
  //   console.log('Metamask web3')
  //   web3 = new Web3(window.web3.currentProvider)
  //   return web3
  // }
  // use PORTIS!!
  console.log('Portis web3')
  web3 = new Web3(createPortisProvider('mainnet'))
  return web3
}

export const updateWeb3 = network => {
  const web3 = getWeb3()
  web3.setProvider(createPortisProvider(network))
}

export function injectWeb3() {
  if (web3) return web3
  web3 = getWeb3()
  return web3
}
