import { allEntities } from '@esprat/db'
import { observable } from 'mobx'

/**
 * Make all entities observable
 */
allEntities.forEach(entity => {
  for (let prop in Object.keys(entity)) {
    let propertyDecorators = [observable]

    const descriptor = Object.getOwnPropertyDescriptor(entity, prop)
    const newDescriptor = propertyDecorators.reduce(
      (accDescriptor, decorator) => decorator(entity, prop, accDescriptor),
      descriptor
    )
    if (newDescriptor) Object.defineProperty(entity, prop, newDescriptor)
  }
})
