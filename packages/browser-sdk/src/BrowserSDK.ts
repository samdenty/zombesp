import { Database } from 'sql.js'
import { SDK } from '@esprat/sdk'
import { SqljsDriver } from 'typeorm/driver/sqljs/SqljsDriver'
import { SqljsConnectionOptions } from 'typeorm/driver/sqljs/SqljsConnectionOptions'
import { saveAs } from 'file-saver'
import { Connection } from 'typeorm'
import { Overwrite } from 'utility-types'

export class BrowserSDK extends SDK {
  public connection: Connection & {
    driver: Overwrite<SqljsDriver, { databaseConnection: Database }>
  }

  public getDatabase() {
    return this.connection.driver.databaseConnection
  }

  public downloadDB(filename = 'sqlite.db') {
    const db = this.getDatabase().export()
    const blob = new Blob([db])

    saveAs(blob, filename)
  }

  public async connect(options?: Partial<SqljsConnectionOptions>) {
    await super.connect({
      type: 'sqljs',
      location: '@esprat/browser-sdk',
      autoSave: true,
      synchronize: true,
      ...options,
    })
  }
}
