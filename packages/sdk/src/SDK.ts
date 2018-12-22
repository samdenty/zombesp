import { DirectConnection, CloudConnection, ESPCom } from '@esprat/espcom'
import { IDatabase } from '@esprat/db'

export class SDK<DB extends IDatabase = IDatabase> {
  constructor(public database: DB) {}

  public async connectToZombie(id: string) {
    const zombie = await this.database.getZombie(id)
    if (!zombie) return null

    const directConnections = zombie.directConnections.map(
      ({ address }) => new DirectConnection(address)
    )

    const mqttConnection =
      zombie.mqttConnection &&
      new CloudConnection(zombie.mqttConnection.address, zombie.id)

    const protocols = [...directConnections, mqttConnection].filter(Boolean)
    const espCom = new ESPCom(protocols)

    return espCom
  }

  public async isZombieAlive() {
    return true
  }
}
