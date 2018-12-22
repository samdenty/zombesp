import { IDatabase } from '@esprat/db'
import { Overwrite } from 'utility-types'

export class DualDatabase<Master extends IDatabase, Replica extends IDatabase> {
  public virtualDatabase: Overwrite<Replica, Master>

  constructor(private masterDb: Master, private replicaDb: Replica) {
    this.virtualDatabase = new Proxy(masterDb as any, {
      get: (_, prop: string) => {
        const method = this.getMethod(prop)
        return method
      },
    })
  }

  private commits = new Set<{ method: string; args: any[] }>()

  public async pushChangesToMaster() {
    if (!this.masterDb.isConnected()) throw `Master DB not connected!`

    // Get the commits at the time this function was called
    const currentCommits = Array.from(this.commits)

    for (const commit of currentCommits) {
      await this.masterDb[commit.method](...commit.args)
      this.commits.delete(commit)
    }
  }

  public pullChangesFromMaster() {}

  private commitMasterTask(method: string, args: any[]) {
    this.commits.add({ method, args })
  }

  private getMethod(method: string) {
    const supportedOnMaster = method in this.masterDb
    const supportedOnReplica = method in this.masterDb

    if (supportedOnMaster || supportedOnReplica) {
      if (supportedOnMaster) {
        if (this.masterDb.isConnected()) {
          console.log('serving from master')
          return this.masterDb[method]
        }
        console.log('supported on master, but not connected')
      }

      if (supportedOnReplica) {
        if (this.replicaDb.isConnected()) {
          console.log('serving from fallback')

          if (supportedOnMaster) {
            // Need to replicate on master
            if (typeof this.replicaDb[method] === 'function') {
              return (...args) => {
                this.commitMasterTask(method, args)
                return this.replicaDb[method](...args)
              }
            }
          }

          return this.replicaDb[method]
        }
        console.log('supported on fallback, but not connected')
      }
    }
    return undefined
  }
}
