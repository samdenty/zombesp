// const adapterUrl = require('./adapter.html')
import { Client, overrideNativeWebsocket } from 'cors-bypass'

export const client = new Client()

export const createServer = () => {
  // client.openServerInNewTab({
  //   adapterUrl,
  //   serverUrl: 'https://example.com',
  //   reloadForFocus: true,
  // })
}

overrideNativeWebsocket(url => {
  const override = location.protocol === 'https:' && url.protocol === 'ws:'

  // todo
  // return override
  return false
})
