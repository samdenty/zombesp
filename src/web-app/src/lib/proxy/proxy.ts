const adapter = require('./adapter.html')
import { Client, overrideNativeWebsocket } from 'cors-bypass'

export const client = new Client()

export const adapterUrl = new URL(adapter, location.href).href
export const createServer = () => {
  client.openServerInNewTab({
    adapterUrl,
    serverUrl: 'https://example.com',
    reloadForFocus: true,
  })
}

overrideNativeWebsocket(url => {
  const override = location.protocol === 'https:' && url.protocol === 'ws:'

  if (override && !client.server) {
    // Not connected, this websocket is going to fail

    // Check if we're still not connected in future

    setTimeout(() => {
      if (!client.server) {
        // console.warn('Need to launch server!')
      }
    }, 400)
  }

  return override
})

//
;(window as any).createServer = createServer
;(window as any).client = client
