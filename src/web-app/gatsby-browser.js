import 'reflect-metadata'
import * as React from 'react'
import { App } from './src/App'

export const wrapRootElement = ({ element }) => {
  return <App>{element}</App>
}
