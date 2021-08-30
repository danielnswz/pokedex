import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, RenderResult } from '@testing-library/react'
import PokedexScreen from './PokedexScreen'
import { IPokemonFull } from '../utils/types'

describe('<PokedexScreen />', () => {
  let component: RenderResult

  test('renders pikachu', () => {
    const pokemonProp: IPokemonFull = {
      id: 1,
      name: 'test',
      sprites: {
        front_default: 'url',
      },
      types: [
        {
          slot: 1,
          type: {
            name: 'fire',
            url: 'url',
          },
        },
      ],
      stats: [],
    }
    component = render(
      <PokedexScreen pokemon={pokemonProp} error={undefined} />
    )
    component.getByText('fire Pikachu')
  })

  test('renders pidgey', () => {
    const pokemonProp: IPokemonFull = {
      id: 1,
      name: 'zapdos',
      sprites: {
        front_default: 'url',
      },
      types: [
        {
          slot: 1,
          type: {
            name: 'electric',
            url: 'url',
          },
        },
      ],
      stats: [],
    }
    component = render(
      <PokedexScreen pokemon={pokemonProp} error={undefined} />
    )
    component.getByText('electric Legendary Pidgey')
  })

  test('handles error', () => {
    component = render(
      <PokedexScreen pokemon={null} error={new Error('this is a test error')} />
    )
  })
})
