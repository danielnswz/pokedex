export interface IPokemonSample {
  id: string
  name: string
  url: string | undefined
}

export interface IPokemonList {
  results: IPokemonSample[]
}

export interface IPokemonResponse {
  count: number
  nextOffset: string
  prevOffset: string
  results: IPokemonSample[]
}

export interface ISprites {
  [key: string]: string
}

export interface IType {
  name: string
  url: string
}
export interface ITypes {
  slot: number
  type: IType
}

export interface IStat {
  name: string
  url: string
}

export interface IStats {
  // eslint-disable-next-line camelcase
  base_stat: number
  effort: number
  stat: IStat
}

export interface IPokemonFull {
  id: number
  name: string
  sprites: ISprites
  types: ITypes[]
  stats: IStats[]
}
