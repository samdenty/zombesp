import { IDatabase } from '@esprat/db'
import { Overwrite } from 'utility-types'

// How long to wait before retrying a method
const RETRY_TIME = 200

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

  private getMethod(method: string, retry = true) {
    const supportedOnMaster = method in this.masterDb
    const supportedOnReplica = method in this.masterDb

    if (supportedOnMaster || supportedOnReplica) {
      if (supportedOnMaster) {
        if (this.masterDb.isConnected()) {
          // Serve from master
          return this.masterDb[method]
        }
        // Supported on master, but not connected
      }

      if (supportedOnReplica) {
        const canProvideOptimisticResponse =
          typeof this.replicaDb[method] === 'function'

        if (this.replicaDb.isConnected()) {
          if (supportedOnMaster && canProvideOptimisticResponse) {
            // Serve from fallback + commit to master
            return (...args) => {
              this.commitMasterTask(method, args)
              return this.replicaDb[method](...args)
            }
          }

          // Serve from fallback
          return this.replicaDb[method]
        }

        // Supported on fallback, but not connected
        if (retry && canProvideOptimisticResponse) {
          // Return a promise, which will later be resolved / rejected
          // when database is available
          return (...args) =>
            new Promise((resolve, reject) => {
              this.commitMasterTask(method, args)

              const retry = () => {
                // Try and recurse
                try {
                  var func = this.getMethod(method, false)
                } catch (e) {
                  return retryInFuture()
                }

                if (typeof func !== 'function')
                  return reject(
                    new Error(
                      `Expected "${method}" to be typeof Function, got "${typeof func}"`
                    )
                  )

                // Successfully retried
                try {
                  const promise = func(...args)

                  if (!(promise instanceof Promise))
                    return reject(
                      new Error(
                        `Expected result of "${method}" to be a promise, got "${typeof func}"`
                      )
                    )

                  promise.then(resolve).catch(reject)
                } catch (e) {
                  reject(e)
                }
              }

              const retryInFuture = () => setTimeout(retry, RETRY_TIME)
              retryInFuture()
            })
        }
      }

      throw new Error(
        `Can't provide a optimistic response for "${method}" database call!`
      )
    }

    return undefined
  }
}
