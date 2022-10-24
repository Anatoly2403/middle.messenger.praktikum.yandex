export type TProps = {
  value: string
  label: string
  disabled: boolean
}
export type TData = TProps & {}
export type TEvents = {
  handleInput: (e: Event) => void
  handleBlur: (e: Event) => void
}
