import * as orm from 'typeorm'
import * as bDb from '@esprat/browser-db'
import { BrowserDatabase } from '@esprat/browser-db'
import { GraphQLDatabase } from '@esprat/graphql-db'
import { SDK } from '@esprat/sdk'
// import { ESPCom, DirectConnection, CloudConnection } from '@esprat/connection'

// const d = new DirectConnection('ws://192.168.1.102:81')
// const c = new CloudConnection('mqtt://127.0.0.1:8080', 'testing')

// const espCom = new ESPCom([d, c])
// ;(window as any).espCom = espCom
// ;(window as any).c = c
// ;(window as any).d = d

// c.emit('hello', 'world')

export async function onMount() {
  // const rdb = new GraphQLDatabase('http://localhost:4000')
  // const db = new BrowserDatabase()
  // ;(window as any).db = db
  // ;(window as any).rdb = rdb
  // await db.connect({ logging: ['query', 'schema'] })
  // const sdk = new SDK(db)
  // ;(window as any).sdk = sdk
  // console.log(db, sdk)
}

Object.entries({ ...orm, ...bDb }).forEach(([key, value]) => {
  if (!window[key]) {
    window[key] = value
  }
})
