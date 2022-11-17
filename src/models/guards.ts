export function isError(e: unknown): e is { reason: string } {
  return e instanceof Object && 'reason' in e && typeof e['reason'] === 'string';
}
