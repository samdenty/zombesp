import * as React from 'react'
import { useContext } from 'react'
import { SDKContext } from '../SDKContext'

export interface ZombieProps {
  id: string
}

export function Zombie({ id }: ZombieProps) {
  console.log(useContext)
  const sdk = useContext(SDKContext)

  return <div>rawr {id}</div>
}
