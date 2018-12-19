import * as orm from 'typeorm'
import * as bSdk from '@esprat/browser-db'
import { BrowserDatabase } from '@esprat/browser-db'
// import { ESPCom, DirectConnection, CloudConnection } from '@esprat/espcom'

// const d = new DirectConnection('ws://192.168.1.102:81')
// const c = new CloudConnection('mqtt://127.0.0.1:8080', 'testing')

// const espCom = new ESPCom([d, c])
// ;(window as any).espCom = espCom
// ;(window as any).c = c
// ;(window as any).d = d

// c.emit('hello', 'world')

Object.entries({ ...orm, ...bSdk }).forEach(([key, value]) => {
  if (!window[key]) {
    window[key] = value
  }
})

export async function onMount() {
  const sdk = new BrowserDatabase()
  ;(window as any).sdk = sdk

  await sdk.connect({
    logging: ['query', 'schema'],
  })

  console.log(sdk)
}
