export type TProps = {
  label: string
  name: string
}
export type TData = TProps & {
  value: string
}
export type TEvents = {
  handleInput: (e: Event) => void
  handleFocus: (e: Event) => void
  handleBlur: (e: Event) => void
}
