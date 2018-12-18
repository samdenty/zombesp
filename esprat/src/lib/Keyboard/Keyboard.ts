import { parseKeyString } from './utils'

export type IKeypressType = 'keyRelease' | 'keyHold' | 'keyPress'

export type IKeyPress = {
  type: IKeypressType
  code: number
}

export type IKeyInput = {
  type: 'input'
  string: string
  interval?: number
}

export type IDelay = {
  type: 'delay'
  amount?: number
}

export type IReleaseAll = {
  type: 'releaseAll'
}

export type IKeyEvent = IKeyPress | IKeyInput | IDelay | IReleaseAll

export type IKey = string | number

export type IKeyboardOptions = {
  inputInterval?: number
}

export class Keyboard {
  public options: IKeyboardOptions

  constructor(
    private emit: (events: IKeyEvent[]) => Promise<void>,
    { inputInterval = 50 }: IKeyboardOptions = {}
  ) {
    this.options = { inputInterval }
  }

  public async press(...keys: IKey[]) {
    const modifiers = keys.map(key => {
      const parsedKey = parseKeyString(key)
      if (!parsedKey) throw `Invalid key "${key}"`

      return parsedKey
    })

    const keyToPress = modifiers.pop()

    const events: IKeyEvent[] = [
      ...modifiers.map((code): IKeyEvent => ({ code, type: 'keyHold' })),
      {
        code: keyToPress,
        type: 'keyPress',
      },
      ...modifiers
        .reverse()
        .map((code): IKeyEvent => ({ code, type: 'keyRelease' })),
    ]

    this.emit(events)
  }

  public async release(key: IKey) {
    const code = parseKeyString(key)
    if (!code) throw `Invalid key "${key}"`

    await this.emit([
      {
        code,
        type: 'keyRelease',
      },
    ])
  }

  public async releaseAll() {
    this.emit([
      {
        type: 'releaseAll',
      },
    ])
  }

  public async hold(key: IKey) {
    const code = parseKeyString(key)
    if (!code) throw `Invalid key "${key}"`

    await this.emit([
      {
        code,
        type: 'keyHold',
      },
    ])
  }

  public async input(
    string: string,
    {
      interval = this.options.inputInterval,
    }: {
      interval?: number
    } = {}
  ) {
    await this.emit([
      {
        type: 'input',
        string,
        interval,
      },
    ])
  }
}
