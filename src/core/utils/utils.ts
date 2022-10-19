import { ISimpleObject } from "../models";

export function createProxy<T extends ISimpleObject>(
  data: T,
  callback?: () => void
): T {
  return new Proxy(data, {
    set(target: T, key: keyof T, val) {
      target[key] = val;
      if (callback) callback();
      return true;
    },
  });
}

export function parseEvent(evString: string) {
  const [event, name] = evString.split(":");
  return {
    event: event.trim(),
    name: name.trim(),
  };
}
