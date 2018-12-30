import { decorateEntities } from '@esprat/db'
import { observable } from 'mobx'

// Make all entities observable
decorateEntities(observable)
