import { SDK } from '@esprat/sdk'
import * as React from 'react'
import { useContext } from 'react'

export const SDKContext = React.createContext<SDK>(null)

export const useSDK = () => useContext(SDKContext)
