import 'reflect-metadata'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App } from './src/App'

export const wrapRootElement = ({ element }) => {
  return <App>{element}</App>
}

// Strict mode
// export const replaceHydrateFunction = () => {
//   return (element, container, callback) => {
//     // @ts-ignore
//     const root = ReactDOM.createRoot(container)

//     root.render(element, callback)
//   }
// }
