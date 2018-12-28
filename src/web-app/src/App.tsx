import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import { client } from './lib/apollo'
import { SDKContext } from './components/SDKContext'
import { SDK } from '@esprat/sdk'
import { DualDatabase } from '@esprat/dual-db'
import { BrowserDatabase } from '@esprat/browser-db'
import { GraphQLDatabase } from '@esprat/graphql-db'

const remoteDb = new GraphQLDatabase()
const localDb = new BrowserDatabase()

remoteDb.connect('http://localhost:4000')
localDb.connect()

const dualDb = new DualDatabase(remoteDb, localDb)
const sdk = new SDK(dualDb.virtualDatabase)
// ;(async () => {
//   await sdk.fetchDirectConnections()
//   await sdk.fetchZombies()
// })()
// sdk.fetchMqttConnections()
//
;(window as any).sdk = sdk
;(window as any).dualDb = dualDb
;(window as any).remoteDb = remoteDb
;(window as any).localDb = localDb

export function App({ children }) {
  return (
    <SDKContext.Provider value={sdk}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </SDKContext.Provider>
  )
}
