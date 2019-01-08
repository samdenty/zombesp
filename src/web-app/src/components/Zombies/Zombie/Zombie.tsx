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
import { Dialog, DialogActions, DialogContent, DialogTitle } from '../../Dialog'
import { useState } from 'react'
import { Button } from '../../Button'
import { useBoolean } from 'react-hanger'

export interface ZombieProps {
  id: string
  recurse?: boolean
}

export const Zombie = observer(({ id, recurse }: ZombieProps) => {
  const dialog = useBoolean(false)
  const sdk = useSDK()

  const zombie = sdk.zombies.get(id)

  return (
    <StyledZombie>
      {!recurse && (
        <Dialog isOpen={dialog.value} onToggle={dialog.setValue}>
          <Zombie id={id} recurse />
        </Dialog>
      )}

      <Section onClick={dialog.setTrue}>
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
