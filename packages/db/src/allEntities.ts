import * as entitiesExports from './entities'
import { getMetadataArgsStorage } from 'typeorm'

const argsStorage = getMetadataArgsStorage()

export const allEntities = Object.values(entitiesExports).filter(
  possibleEntity =>
    argsStorage.tables.find(({ target }) => target === possibleEntity)
)

export const decorateEntities = (decorator: Function) => {
  for (const { target: thing, propertyName } of argsStorage.columns) {
    const target = typeof thing === 'function' ? thing.prototype : thing
    const propertyDecorators = [decorator]

    const descriptor = Object.getOwnPropertyDescriptor(target, propertyName)
    const newDescriptor = propertyDecorators.reduce(
      (accDescriptor, decorator) =>
        decorator(target, propertyName, accDescriptor),
      descriptor
    )

    if (newDescriptor)
      Object.defineProperty(target, propertyName, newDescriptor)
  }
}
