import { ISimpleObject } from '../models'
import { createProxy } from '../utils'

export class DataController<TData extends ISimpleObject = ISimpleObject> {
  private _data: TData = {} as TData

  private makeAsProxy(value: TData, handler?: (prevData: TData) => void) {
    return createProxy<TData>(value, handler)
  }

  public get data(): TData {
    return this._data
  }

  public init(value: TData, handler?: (prevData: TData) => void): void {
    this._data = this.makeAsProxy(value, handler)
  }

  public updateData(value: TData) {
    Object.assign(this._data, value)
  }
}
