import * as React from 'react'
import { observer } from 'mobx-react-lite'
import { useSDK } from '../../hooks'
import { Zombie } from './Zombie'
import { StyledZombies } from './elements'

export interface ZombiesProps {}

export const Zombies = observer(({  }: ZombiesProps) => {
  const sdk = useSDK()

  return (
    <StyledZombies>
      {Array.from(sdk.zombies).map(([, zombie]) => (
        <Zombie id={zombie.id} key={zombie.id} />
      ))}
    </StyledZombies>
  )
})
