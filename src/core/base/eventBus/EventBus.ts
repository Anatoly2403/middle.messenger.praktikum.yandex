import { EEvents, ISimpleObject } from '../models';

export class EventBus<TData extends ISimpleObject = ISimpleObject> {
  private listeners: Record<string, Array<(...args: Array<TData>) => void>>;

  constructor() {
    this.listeners = {};
  }

  on(event: EEvents, callback: (...args: Array<TData>) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event: EEvents, callback: (...args: Array<TData>) => void) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
  }

  emit(event: EEvents, ...args: Array<TData>) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }
    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}
