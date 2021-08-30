import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Pokedex } from './modules/Pokedex'
// import { AditionalModule } from './modules/AditionalModule'
import './App.scss'

function App(): React.ReactElement {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <div className='App'>
        <Pokedex />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
