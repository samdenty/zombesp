/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetDirectConnection
// ====================================================

export interface GetDirectConnection_directConnection_zombie {
  id: string
}

export interface GetDirectConnection_directConnection {
  id: string
  address: string
  zombie: GetDirectConnection_directConnection_zombie
}

export interface GetDirectConnection {
  directConnection: GetDirectConnection_directConnection
}

export interface GetDirectConnectionVariables {
  id: string
}
