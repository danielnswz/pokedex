import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, RenderResult } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Pokedex } from './Pokedex'

describe('<Pokedex />', () => {
  const queryClient = new QueryClient()
  let component: RenderResult

  test('renders', () => {
    component = render(
      <QueryClientProvider client={queryClient}>
        <Pokedex />
      </QueryClientProvider>
    )
  })
})
