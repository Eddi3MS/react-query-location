import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Outlet, ReactLocation, Router } from '@tanstack/react-location'

import { routes } from './routes'
import { PokemonProvider } from './context'

const queryClient = new QueryClient()
const location = new ReactLocation()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PokemonProvider>
        <Router location={location} routes={routes}>
          <div className='mx-auto max-w-3xl'>
            <Outlet />
          </div>
        </Router>
      </PokemonProvider>
    </QueryClientProvider>
  )
}

export default App
