import './lib/proxy/proxy'
require('events').EventEmitter.defaultMaxListeners = Infinity

import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import { client } from './lib/apollo'
import { SDKContext } from './hooks'
import { sdk } from './lib/sdk'

export function App({ children }) {
  return (
    <SDKContext.Provider value={sdk}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </SDKContext.Provider>
  )
}
