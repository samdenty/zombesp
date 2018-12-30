import * as React from 'react'
import { observer } from 'mobx-react-lite'
import { useSDK } from '../../../hooks'
import { StyledZombie, ZombieName, Section, SectionTitle } from './elements'
import { ZombieConnections } from '../../ZombieConnections'

export interface ZombieProps {
  id: string
}

export const Zombie = observer(({ id }: ZombieProps) => {
  const sdk = useSDK()
  const zombie = sdk.zombies.get(id)

  return (
    <StyledZombie>
      <Section>
        <ZombieName>{zombie.id}</ZombieName>
      </Section>

      <Section>Hello</Section>

      <Section darker>
        <SectionTitle>Status</SectionTitle>
        <ZombieConnections id={id} />
      </Section>

      {zombie.directConnections.length}
      <table>
        {zombie.directConnections.map(directConnection => (
          <tr>
            <th>{directConnection.id}</th>
            <th>{directConnection.address}</th>
          </tr>
        ))}
      </table>
    </StyledZombie>
  )
})
