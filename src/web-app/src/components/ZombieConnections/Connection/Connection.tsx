import * as React from 'react'
import {
  Root,
  Status,
  Info,
  LastSeen,
  OnlineIndicator,
  OnlineStatus,
} from './elements'
import Moment from 'react-moment'
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
  return (
    <Root>
      <Status>
        <OnlineStatus>
          <OnlineIndicator
            pose={
              link.online ? 'online' : link.connected ? 'connected' : 'offline'
            }
          />
          {link.online ? 'Online' : link.connected ? 'Connecting' : 'Offline'}
        </OnlineStatus>

        {link.lastOnline && (
          <LastSeen>
            {`${link.online ? 'for' : 'last online'} `}
            <Moment
              date={link.lastOnline}
              interval={500}
              fromNow
              ago={link.online}
            />
          </LastSeen>
        )}
      </Status>
      <Info>
        {connection.id}
        via {connection instanceof MQTTConnection ? 'MQTT' : 'Direct'}{' '}
        <a href="#">{connection.address}</a>
      </Info>
    </Root>
  )
})
