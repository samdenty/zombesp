import * as entitiesExports from './entities'
import { getMetadataArgsStorage } from 'typeorm'

const argsStorage = getMetadataArgsStorage()

export const allEntities = Object.values(entitiesExports).filter(
  possibleEntity =>
    argsStorage.tables.find(({ target }) => target === possibleEntity)
)
