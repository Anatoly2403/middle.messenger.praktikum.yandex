import { TEventHandler } from '../models'

export const isEventHandler = (fn: unknown): fn is TEventHandler => {
  return typeof fn === 'function' && fn.length < 2
}
