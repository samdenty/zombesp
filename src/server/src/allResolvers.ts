import * as resolverExports from './resolvers'
import { getMetadataStorage } from 'type-graphql/metadata/getMetadataStorage'

const argsStorage = getMetadataStorage()

export const resolvers = Object.values(resolverExports).filter(possibleEntity =>
  (argsStorage as any).resolverClasses.find(
    ({ target }) => target === possibleEntity
  )
)
