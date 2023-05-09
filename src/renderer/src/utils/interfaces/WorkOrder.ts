export interface IWorkOrder {
  isemrino: string
  stokKodu: string
  yedek2: string
  yapkod: string
}

export interface IMinMax {
  serino: string
  birimAgirlik: number
  maxkg: number
  minkg: number
  maxad: number
  minad: number
}

export interface IToBeProduced {
  remaining: number
  produced: number
  toBeProducedItem: IToBeProducedItem
}

export interface IToBeProducedItem {
  value: number
  ciid: number
  did: number
}
