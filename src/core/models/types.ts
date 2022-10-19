export type TEventHandler = (event: Event) => void

export type TBindHelper = (fn: TEventHandler) => TEventHandler

export type TEvents = Record<string, TEventHandler>

export type FunctionReturnType<
  FunctionType extends (args: any) => any
> = FunctionType extends (...args: any) => infer ReturnType ? ReturnType : any
