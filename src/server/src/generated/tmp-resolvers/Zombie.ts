// This resolver file was scaffolded by github.com/prisma/graphqlgen, DO NOT EDIT.
// Please do not import this file directly but copy & paste to your application code.

import { ZombieResolvers } from '../graphqlgen'

export const Zombie: ZombieResolvers.Type = {
  ...ZombieResolvers.defaultResolvers,

  mqttConnection: (parent, args, ctx) => {
    throw new Error('Resolver not implemented')
  },
  directConnections: (parent, args, ctx) => {
    throw new Error('Resolver not implemented')
  },
}
