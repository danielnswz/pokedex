import React from 'react'
import { IPokemonFull } from '../types'
import { PokemonStats } from './PokemonStats'
import './PokedexScreen.scss'

interface Props {
  pokemon: IPokemonFull | null
  error: Error | undefined
}

const dictionary = [
  'articuno',
  'moltres',
  'zapdos',
  'pidgey',
  'pidgeotto',
  'pidgeot',
]

export const PokedexScreen = ({
  pokemon,
  error,
}: Props): React.ReactElement => (
  <div className='pokedex-main-screen'>
    <h4>{error && error?.message}</h4>
    <h1 className='pokedex-main-screen__title'>
      {pokemon && `#${String(pokemon?.id).padStart(2, '0')} - ${pokemon?.name}`}
    </h1>
    <h4 className='pokedex-main-screen__title'>
      {/* Just Joking :v */}
      {pokemon &&
        `${pokemon.types[0]?.type?.name} ${
          dictionary.includes(pokemon?.name) ? 'Legendary Pidgey' : 'Pikachu'
        }`}
    </h4>
    <div className='pokedex-main-screen__sprite-container'>
      {pokemon?.sprites?.front_default && (
        <img src={pokemon?.sprites?.front_default} alt={pokemon.name} />
      )}
    </div>
    <PokemonStats pokeStats={pokemon?.stats} />
  </div>
)
