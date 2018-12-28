import * as React from 'react'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { SDKContext } from '../SDKContext'

export interface ZombieProps {
  id: string
}

export const Zombie = observer(({ id }: ZombieProps) => {
  const sdk = useContext(SDKContext)
  const zombie = sdk.zombies.get(id)

  return (
    <div>
      {zombie.id}: {zombie.directConnections.length}
    </div>
  )
})
