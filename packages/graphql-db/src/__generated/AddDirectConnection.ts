/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddDirectConnection
// ====================================================

export interface AddDirectConnection_addDirectConnection_zombie {
  id: string
}

export interface AddDirectConnection_addDirectConnection {
  id: string
  address: string
  zombie: AddDirectConnection_addDirectConnection_zombie
}

export interface AddDirectConnection {
  addDirectConnection: AddDirectConnection_addDirectConnection
}

export interface AddDirectConnectionVariables {
  zombieId: string
  address: string
}
