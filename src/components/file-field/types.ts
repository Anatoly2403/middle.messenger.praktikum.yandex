export type TProps = {
  name: string
  label: string
}

export type TData = TProps & {
  hasFile: boolean
}

export type TEvents = {
  handleInput: EventListener
}
