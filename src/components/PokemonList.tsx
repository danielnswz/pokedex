/* eslint-disable react/button-has-type */
import React, { ReactElement } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { IPokemonSample } from '../utils/types'
import './PokemonList.scss'

interface Props {
  pokemons: IPokemonSample[]
  selectedPokemon: string | null
  setSelectedPokemon: (pokemonId: string | null) => void
  fetchNextPage: () => void
  hasNextPage: boolean | undefined
  error: Error
}

const PokemonList = ({
  pokemons,
  selectedPokemon,
  setSelectedPokemon,
  fetchNextPage,
  hasNextPage,
  error,
}: Props): ReactElement => {
  return (
    <div id='scrollableDiv' className='pokemon-list pokemon-list__container'>
      <InfiniteScroll
        dataLength={pokemons.length}
        next={fetchNextPage}
        style={{ display: 'flex', flexDirection: 'column' }}
        hasMore={!!hasNextPage}
        loader={<h4>Loading...</h4>}
        scrollableTarget='scrollableDiv'
      >
        {pokemons.map((pokemon: IPokemonSample) => (
          <div
            key={pokemon.id}
            role='row'
            tabIndex={Number(pokemon.id)}
            className={`pokemon-list pokemon-list__item ${
              selectedPokemon === pokemon.id && 'pokemon-list__item--highlight'
            }`}
            onClick={() => setSelectedPokemon(pokemon.id)}
            onKeyDown={() => setSelectedPokemon(pokemon.id)}
          >
            <p>
              {pokemon.id.padStart(2, '0')} {pokemon.name}
            </p>
          </div>
        ))}
      </InfiniteScroll>
      <h5>{error && error?.message}</h5>
    </div>
  )
}

export default PokemonList
