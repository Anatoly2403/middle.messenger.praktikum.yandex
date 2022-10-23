import { ISimpleObject } from '../models'
import { createProxy } from '../utils'

export class DataController<TData extends ISimpleObject = ISimpleObject> {
  private _prevData: TData = {} as TData
  private _data: TData = {} as TData

  private makeAsProxy(value: TData, handler?: () => void) {
    return createProxy<TData>(value, this._prevData, handler)
  }

  public get data(): TData {
    return this._data
  }

  public get prevData(): TData {
    return this._prevData
  }

  public init(value: TData, handler?: () => void): void {
    this._data = this.makeAsProxy(value, handler)
  }

  public updateData(value: TData) {
    Object.assign(this._data, value)
  }
}
