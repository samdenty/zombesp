import * as DB from '@esprat/db'
import { Zombie } from './Zombie'
import { observable, reaction } from 'mobx'
import { DirectLink } from '@esprat/connection'

export class DirectConnection extends DB.DirectConnection {
  private disposers: Function[]

  @observable public link: DirectLink
  @observable public zombie: Zombie

  constructor() {
    super()

    this.disposers = [
      reaction(
        () => this.address,
        address => {
          if (this.link) this.link.dispose()
          this.link = new DirectLink(address)
        }
      ),
    ]
  }

  public dispose() {
    this.disposers.forEach(dispose => dispose())
    this.link.dispose()
  }
}
