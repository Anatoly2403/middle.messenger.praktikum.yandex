import Component from "../Component";

export function Event() {
  return (
    target: Component,
    propKey: string | symbol,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
  ) => {
    target.setEvents({
      [propKey]: descriptor.value,
    });
  };
}
