import { SimpleObject } from "../models";

export function createProxy<T extends SimpleObject>(
  data: T,
  callback: () => void
): T {
  return new Proxy(data, {
    set(target: T, key: keyof T, val) {
      target[key] = val;
      callback();
      return true;
    },
  });
}

export function getEvent(evString: string) {
  const [event, name] = evString.split(":");
  return {
    event: event.trim(),
    name: name.trim(),
  };
}
