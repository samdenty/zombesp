import * as React from 'react'
import { MdAddCircle } from 'react-icons/md'
import { observer } from 'mobx-react-lite'
import { useSDK } from '../../hooks'
import { Zombie } from './Zombie'
import { StyledZombies, AddZombie, AddZombieIcon } from './elements'

export interface ZombiesProps {}

export const Zombies = observer(({  }: ZombiesProps) => {
  const sdk = useSDK()

  return (
    <StyledZombies>
      {Array.from(sdk.zombies).map(([, zombie]) => (
        <Zombie id={zombie.id} key={zombie.id} />
      ))}

      <AddZombie>
        <AddZombieIcon />
      </AddZombie>
    </StyledZombies>
  )
})
