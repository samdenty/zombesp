import * as React from 'react'
import { Root, ShowMore } from './elements'
import { observer } from 'mobx-react-lite'
import {
  Zombie,
  sortLinkOnline,
  sortLinkLastConnected,
  sortLinkLastOnline,
} from '@esprat/sdk'
import posed, { PoseGroup } from 'react-pose'
import { Connection } from './Connection'
import { useState } from 'react'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'

export interface ZombieConnectionsProps {
  zombie: Zombie
  max?: number
}

const Item = posed.div({
  enter: {
    x: 0,
    height: 'auto',
    opacity: 1,
    delay: ({ i }) => i * 50,
    transition: {
      x: { type: 'spring', stiffness: 200 },
      height: { duration: 100 },
    },
  },
  exit: {
    height: 0,
    x: -30,
    opacity: 0,
    transition: { duration: 150 },
  },
})

export const ZombieConnections = observer(
  ({ zombie, max }: ZombieConnectionsProps) => {
    const [showMore, setShowMore] = useState(false)

    const connections = Array.from(zombie.links).sort(
      ([, a], [, b]) =>
        sortLinkOnline(a, b) ||
        sortLinkLastOnline(a, b) ||
        sortLinkLastConnected(a, b)
    )

    const visibleConnections = showMore
      ? connections
      : connections.slice(0, max)

    return (
      <Root>
        <PoseGroup>
          {visibleConnections.map(([connection, link], i) => (
            <Item key={`${connection.constructor.name}-${connection.id}`} i={i}>
              <Connection connection={connection} link={link} />
            </Item>
          ))}
        </PoseGroup>

        {connections.length > max && (
          <ShowMore
            onClick={() => setShowMore(!showMore)}
            icon={showMore ? <MdExpandLess /> : <MdExpandMore />}
          >
            {showMore
              ? `Show less`
              : `Show more (${connections.length - visibleConnections.length})`}
          </ShowMore>
        )}
      </Root>
    )
  }
)
