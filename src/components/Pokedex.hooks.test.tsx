import React, { ReactElement } from 'react'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  UseQueryResult,
} from 'react-query'
import { renderHook } from '@testing-library/react-hooks'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { axiosInstance, BASE_URL } from '../utils/request'
import { useInfinitePokemonQuery, usePokemonQuery } from './Pokedex.hooks'

interface Props {
  children: ReactElement[]
}

const body = { hello: 'world' }

const server = setupServer(
  ...[
    rest.get('https://pokeapi.co/api/v2/pokemon/1/', (_, res, ctx) => {
      return res(ctx.status(200), ctx.json(body))
    }),
    rest.get('https://pokeapi.co/api/v2/pokemon/456sdf/', (_, res, ctx) => {
      return res(ctx.status(418), ctx.json({ message: 'Im a Teapot' }))
    }),
  ]
)
describe('Pokedex hooks', () => {
  beforeAll(() => server.listen())

  afterEach(() => server.resetHandlers())

  afterAll(() => server.close())

  test('usePokemonQuery success', async () => {
    const queryClient = new QueryClient()
    const wrapper = ({ children }: Props): ReactElement => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )

    const { result, waitFor } = renderHook(() => usePokemonQuery('1', true), {
      wrapper,
    })

    await waitFor(() => result.current.isSuccess)

    expect(result.current.data).toMatchObject(body)
  })
})
