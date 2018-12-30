import * as React from 'react'
import { Connection, Root, Status, Info } from './elements'
import { useSDK } from '../../hooks'
import { observer } from 'mobx-react-lite'
import { MQTTConnection } from '@esprat/sdk'

export interface ZombieConnectionsProps {
  id: string
}

export const ZombieConnections = observer(({ id }: ZombieConnectionsProps) => {
  const sdk = useSDK()
  const zombie = sdk.zombies.get(id)

  if (!zombie) return null

  return (
    <Root>
      {zombie.directConnections /*.sort((a,b) => a.)*/
        .map(({ id, address, link }) => (
          <Connection key={id}>
            <Status>{link.connected ? 'Connected' : 'Disconnected'}</Status>
            <Info>
              via direct <a href="#">{address}</a>
            </Info>
          </Connection>
        ))}

      {zombie.mqttConnection
        ? (({ address, links }: MQTTConnection) => {
            const link = links.get(zombie.id)

            return (
              <Connection>
                <Status>{link.connected ? 'Connected' : 'Disconnected'}</Status>
                <Info>
                  via MQTT <a href="#">{address}</a>
                </Info>
              </Connection>
            )
          })(zombie.mqttConnection)
        : null}
    </Root>
  )
})
