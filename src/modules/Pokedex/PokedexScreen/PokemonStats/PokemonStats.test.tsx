import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, RenderResult } from '@testing-library/react'
import { PokemonStats } from './PokemonStats'

describe('<PokemonStats />', () => {
  let component: RenderResult
  const statsProps = [
    {
      base_stat: 2,
      effort: 2,
      stat: {
        name: 'stat',
        url: 'url',
      },
    },
  ]

  beforeEach(() => {
    component = render(<PokemonStats pokeStats={statsProps} />)
  })

  test('renders', () => {
    component.getByText(statsProps[0].stat.name)
  })
})
