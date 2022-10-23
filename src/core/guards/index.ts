export const isEventHandler = (fn: unknown): fn is EventListener => {
  return typeof fn === 'function' && fn.length < 2
}
