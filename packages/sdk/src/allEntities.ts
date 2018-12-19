import { getMetadataArgsStorage } from 'typeorm'
import * as entitiesExports from './entities'

const argsStorage = getMetadataArgsStorage()

export const allEntities = Object.values(entitiesExports).filter(
  possibleEntity =>
    argsStorage.tables.find(({ target }) => target === possibleEntity)
)
