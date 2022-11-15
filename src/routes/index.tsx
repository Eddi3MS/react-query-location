import { PokemonDetails, PokemonList, SearchBox } from '../components'

export const routes = [
  {
    path: '/',
    element: (
      <>
        <SearchBox />
        <PokemonList />
      </>
    ),
  },
  {
    path: '/pokemon/:id',
    element: <PokemonDetails />,
  },
]
