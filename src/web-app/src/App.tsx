require('events').EventEmitter.defaultMaxListeners = Infinity

import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import { client } from './lib/apollo'
import { SDKContext } from './hooks'
import { SDK } from '@esprat/sdk'
import { DualDatabase } from '@esprat/dual-db'
import { BrowserDatabase } from '@esprat/browser-db'
import { GraphQLDatabase } from '@esprat/graphql-db'
import { MaterialUIProvider } from './lib/material-ui'

const remoteDb = new GraphQLDatabase()
const localDb = new BrowserDatabase()

remoteDb.connect('http://localhost:4000')
localDb.connect()

const dualDb = new DualDatabase(remoteDb, localDb)
const sdk = new SDK(dualDb.virtualDatabase)

setTimeout(() => {
  sdk.fetch()
}, 500)

//
;(window as any).sdk = sdk
;(window as any).dualDb = dualDb
;(window as any).remoteDb = remoteDb
;(window as any).localDb = localDb

export function App({ children }) {
  return (
    <MaterialUIProvider>
      <SDKContext.Provider value={sdk}>
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </SDKContext.Provider>
    </MaterialUIProvider>
  )
}
