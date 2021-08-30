import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, RenderResult } from '@testing-library/react'
import PokemonList from './PokemonList'
import { IPokemonSample } from '../utils/types'

describe('<PokemonList />', () => {
  let component: RenderResult
  const setSelectedPokemon = jest.fn()
  const fetchNextPage = jest.fn()

  test('renders', () => {
    const pokemonsProp: IPokemonSample[] = [
      {
        id: '1',
        name: 'test',
        url: undefined,
      },
    ]
    component = render(
      <PokemonList
        pokemons={pokemonsProp}
        selectedPokemon='1'
        setSelectedPokemon={setSelectedPokemon}
        fetchNextPage={fetchNextPage}
        hasNextPage={false}
        error={undefined}
      />
    )
    fireEvent.click(component.getByText('01 test'))
    expect(setSelectedPokemon).toHaveBeenCalled()
    fireEvent.keyDown(component.getByText('01 test'))
    expect(setSelectedPokemon).toHaveBeenCalledTimes(2)
  })

  test('handles error', () => {
    component = render(
      <PokemonList
        pokemons={[]}
        selectedPokemon={null}
        setSelectedPokemon={setSelectedPokemon}
        fetchNextPage={fetchNextPage}
        hasNextPage={false}
        error={new Error('this is a test error')}
      />
    )
  })
})
