#!/usr/bin/env ts-node

import { execSync } from 'child_process'
import * as path from 'path'
import * as fs from 'fs'

const generated = path.join(process.cwd(), './src/__generated')

const modules = fs.readdirSync(generated)
const filteredModules = modules.filter(
  p => !/(index\.ts)|(globalTypes\.ts)/.test(p) && /\.ts$/.test(p)
)

const exportStatements = filteredModules.map(
  path => `export * from './${path.split('.ts')[0]}'`
)

fs.writeFileSync(
  path.join(generated, './index.ts'),
  exportStatements.join('\n')
)

execSync(`prettier --write ${generated}/*.ts`)
