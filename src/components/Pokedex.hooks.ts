import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useQuery,
  UseQueryResult,
} from 'react-query'
import queryString from 'query-string'
import loglevel from 'loglevel'
import { IPokemonSample, IPokemonResponse } from '../utils/types'
import { axiosInstance } from '../utils/request'

const getPokemon = async (id: string | null): Promise<void> => {
  try {
    const { data } = await axiosInstance.get(`/pokemon/${id}/`)
    return data
  } catch (error) {
    loglevel.error(`There was an error fetching the pokemon ${error}`)
    throw error
  }
}

const getPokemons = async ({ pageParam = 0 }): Promise<IPokemonResponse> => {
  try {
    const { data } = await axiosInstance.get(
      `/pokemon/?offset=${pageParam}&limit=10`
    )
    const results = data?.results.map((el: IPokemonSample) => {
      const urlSplit = el.url?.split('/')
      return {
        ...el,
        id: urlSplit ? urlSplit[urlSplit.length - 2] : undefined,
      }
    })
    const { offset: nextOffset } = data.next
      ? queryString.parseUrl(data?.next).query
      : { offset: null }
    const { offset: prevOffset } = data.previous
      ? queryString.parseUrl(data?.previous).query
      : { offset: null }
    return {
      ...data,
      nextOffset,
      prevOffset,
      results,
    }
  } catch (error) {
    loglevel.error(`There was an error fetching pokemonList ${error}`)
    throw error
  }
}

export const useInfinitePokemonQuery = (): UseInfiniteQueryResult => {
  const inifiniteResponse = useInfiniteQuery('pokemons', getPokemons, {
    getNextPageParam: (_lastPage) => _lastPage.nextOffset,
    getPreviousPageParam: (_firstPage) => _firstPage.prevOffset,
  })

  return inifiniteResponse
}

export const usePokemonQuery = (
  id: string | null,
  enabled: boolean
): UseQueryResult => {
  return useQuery(['pokemon', id], () => getPokemon(id), {
    enabled,
  })
}
