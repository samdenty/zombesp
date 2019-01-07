import { SDK } from '@esprat/sdk'
import { DualDatabase } from '@esprat/dual-db'
import { BrowserDatabase } from '@esprat/browser-db'
import { GraphQLDatabase } from '@esprat/graphql-db'

const createSDK = () => {
  if (typeof window === 'undefined') return null

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

  return sdk
}

export const sdk = createSDK()
