import * as React from 'react'
import {
  StyledConnection,
  Address,
  Header,
  Content,
  LastSeen,
  OnlineIndicator,
  OnlineStatus,
  ConnectionInfo,
  ConnectionType,
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
    <StyledConnection>
      <OnlineIndicator
        pose={link.online ? 'online' : link.connected ? 'connected' : 'offline'}
      />

      <Content>
        <Header>
          <OnlineStatus>
            {link.online ? 'Online' : link.connected ? 'Pending' : 'Offline'}
          </OnlineStatus>
          <ConnectionInfo>
            {/* <ConnectionType>
              {connection instanceof MQTTConnection ? 'MQTT' : 'direct'}{' '}
            </ConnectionType> */}

            <Address>{connection.address}</Address>
          </ConnectionInfo>
        </Header>

        {link.lastOnline && (
          <LastSeen>
            {link.online ? (
              <>
                {`duration `}
                <Moment
                  date={link.startOnline}
                  interval={1000}
                  durationFromNow
                />
              </>
            ) : (
              <>
                {`last online `}
                <Moment date={link.lastOnline} interval={500} fromNow />
              </>
            )}
          </LastSeen>
        )}
      </Content>
    </StyledConnection>
  )
})
