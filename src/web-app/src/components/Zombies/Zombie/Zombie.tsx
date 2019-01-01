import * as React from 'react'
import { observer } from 'mobx-react-lite'
import { useSDK } from '../../../hooks'
import {
  StyledZombie,
  ZombieName,
  Section,
  SectionTitle,
  ConnectionsSection,
} from './elements'
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

      <ConnectionsSection>
        <SectionTitle>Connections ({zombie.connectionCount})</SectionTitle>
        <ZombieConnections zombie={zombie} max={2} />
      </ConnectionsSection>
    </StyledZombie>
  )
})
