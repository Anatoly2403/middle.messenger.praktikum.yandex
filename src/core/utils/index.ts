import { ISimpleObject } from '../models'

export function createProxy<TData extends ISimpleObject>(
  data: TData,
  prevData: TData,
  callback?: () => void,
): TData {
  return new Proxy(data, {
    set(target: TData, key: keyof TData, val) {
      prevData[key] = target[key]
      target[key] = val
      if (callback) callback()
      return true
    },
  })
}

export function parseEvent(evString: string) {
  const [event, name] = evString.split(':')
  return {
    event: event.trim(),
    name: name.trim(),
  }
}

export function getPathsObj(path: string) {
  return path
    .replace(/\[/g, '')
    .replace(/\]/g, '')
    .split('.')
    .filter((item) => item !== 'this')
    .filter((item) => item !== 'data')
}
