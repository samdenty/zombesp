/* tslint:disable */
// This file was automatically generated and should not be edited.

import { DirectConnectionsFilterInput } from './globalTypes'

// ====================================================
// GraphQL query operation: GetDirectConnections
// ====================================================

export interface GetDirectConnections_directConnections_zombie {
  id: string
}

export interface GetDirectConnections_directConnections {
  id: string
  address: string
  zombie: GetDirectConnections_directConnections_zombie
}

export interface GetDirectConnections {
  directConnections: GetDirectConnections_directConnections[]
}

export interface GetDirectConnectionsVariables {
  filter?: DirectConnectionsFilterInput | null
}
