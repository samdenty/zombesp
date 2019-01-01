import * as React from 'react'
import { Root, Status, Info } from './elements'
import { useSDK } from '../../../hooks'
import { observer } from 'mobx-react-lite'
import {
  MQTTConnection,
  DirectConnection,
  MQTTLink,
  DirectLink,
} from '@esprat/sdk'

export type ConnectionProps = {
  connection: MQTTConnection | DirectConnection
  link: MQTTLink | DirectLink
}

export const Connection = observer(({ connection, link }: ConnectionProps) => {
  // const sdk = useSDK()

  return (
    <Root>
      <Status>
        {link.connected ? 'Connected' : 'Disconnected'} since
        {+link.lastConnected}
      </Status>
      <Info>
        via {connection instanceof MQTTConnection ? 'MQTT' : 'Direct'}{' '}
        <a href="#">{connection.address}</a>
      </Info>
    </Root>
  )
})
