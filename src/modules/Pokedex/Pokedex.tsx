import React, { useState, useEffect } from 'react'
import { PokedexScreen } from './PokedexScreen'
import { PokemonList } from './PokemonList'
import { IPokemonList, IPokemonSample, IPokemonFull } from './types'
import { useInfinitePokemonQuery, usePokemonQuery } from './Pokedex.hooks'

export const Pokedex = (): React.ReactElement => {
  const [pokemons, setPokemons] = useState<IPokemonSample[]>([])
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null)

  const {
    data: pokemonList,
    error: pokemonListError,
    fetchNextPage,
    hasNextPage,
  } = useInfinitePokemonQuery()

  const { data: pokemonData, error: pokemonError } = usePokemonQuery(
    selectedPokemon,
    !!selectedPokemon
  )

  useEffect(() => {
    const flattenPokemons = ((pokemonList?.pages as Array<IPokemonList>) || [])
      .map((elements): IPokemonSample[] => elements?.results)
      .flat()
    setPokemons(flattenPokemons)
  }, [pokemonList])

  return (
    <div className='pokedex'>
      <div className='pokedex__left'>
        <div className='pokedex__left__top'>
          <div className='pokedex__light pokedex__light--big pokedex__light--sky' />
          <div className='pokedex__light pokedex__light--red' />
          <div className='pokedex__light pokedex__light--yellow' />
          <div className='pokedex__light pokedex__light--green' />
        </div>
        <div className='pokedex__screen-container'>
          <PokedexScreen
            pokemon={pokemonData as IPokemonFull}
            error={pokemonError as Error}
          />
        </div>
        <div className='pokedex__left__bottom'>
          <div className='pokedex__left__bottom__lights'>
            <div className='pokedex__light pokedex__light--blue pokedex__light--medium' />
            <div className='pokedex__light pokedex__light--green pokedex__light--large' />
            <div className='pokedex__light pokedex__light--orange pokedex__light--large' />
          </div>
        </div>
      </div>
      <div className='pokedex__right'>
        <div className='pokedex__list-container'>
          <PokemonList
            pokemons={pokemons}
            selectedPokemon={selectedPokemon}
            setSelectedPokemon={setSelectedPokemon}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            error={pokemonListError as Error}
          />
        </div>
      </div>
    </div>
  )
}
