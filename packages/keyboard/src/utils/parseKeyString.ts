import { IKey } from '../Keyboard'
import { keyByCode, keyByName } from './keycode'

export function parseKeyString(keyString: IKey): number | null {
  if (typeof keyString === 'number') {
    const key = keyByCode(keyString)
    if (key) return key.code
  }

  if (typeof keyString === 'string') {
    const key = keyByName(keyString)
    if (key) return key.code
  }

  return null
}
