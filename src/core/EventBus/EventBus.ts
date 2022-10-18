import { Events } from "../models";

export class EventBus {
  private listeners: Record<string, Array<(...args: Array<unknown>) => void>>;

  constructor() {
    this.listeners = {};
  }

  on(event: Events, callback: (...args: Array<unknown>) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event: Events, callback: (...args: Array<unknown>) => void) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback
    );
  }

  emit(event: Events, ...args: Array<unknown>) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }
    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}
