export type TProps = {
  hidden: boolean
  label: string
  structure: TStructure[]
  btnLabel: string
  btnClick: () => void
}
export type TData = TProps & {}
export type TEvents = {
  buttonClick: () => void
  hideModal: () => void
}

type TFieldType = 'inputField' | 'fileField'

export type TStructure = {
  type: TFieldType
  label: string
  name: string
}
