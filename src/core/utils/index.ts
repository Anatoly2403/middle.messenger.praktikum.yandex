import { ISimpleObject } from '../models'

export function createProxy<TData extends ISimpleObject>(
  data: TData,
  callback?: (prevData: TData) => void,
): TData {
  return new Proxy(data, {
    set(target: TData, key: keyof TData, val) {
      const prev = { ...target }
      target[key] = val
      if (callback) callback(prev)
      return true
    },
  })
}

export function parseEvent(evString: string) {
  const str = evString.replace(/\[/g, '').replace(/\]/g, '')

  return str.split(',').map((item) => {
    const [event, name] = item.split(':')
    return {
      event: event.trim(),
      name: name.trim(),
    }
  })
}

export function getPathsObj(path: string) {
  return path
    .replace(/\[/g, '')
    .replace(/\]/g, '')
    .split('.')
    .filter((item) => item !== 'this')
    .filter((item) => item !== 'data')
}
