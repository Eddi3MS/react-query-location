import { useQuery } from '@tanstack/react-query'
import { createContext, ReactNode, useContext, useMemo, useState } from 'react'

type PokemonContextProps = {
  children: ReactNode
}

interface Pokemon {
  id: number
  name: string
  type: string[]
  hp: number
  attack: number
  defense: number
  special_attack: number
  special_defense: number
  speed: number
}

interface UsePokemonSourceReturn {
  pokemon: Pokemon[]
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
}

function usePokemonSource(): UsePokemonSourceReturn {
  const [search, setSearch] = useState('')

  const { data: pokemon } = useQuery<Pokemon[]>(
    ['pokemon'],
    () => fetch('/pokemon.json').then((res) => res.json()),
    {
      initialData: [],
    }
  )

  const filteredPokemon = useMemo(
    () =>
      pokemon
        .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
        .slice(0, 20),
    [pokemon, search]
  )

  const sortedPokemon = useMemo(
    () => [...filteredPokemon].sort((a, b) => a.name.localeCompare(b.name)),
    [filteredPokemon]
  )

  return { pokemon: sortedPokemon, search, setSearch }
}

const PokemonContext = createContext<ReturnType<typeof usePokemonSource>>(
  {} as unknown as ReturnType<typeof usePokemonSource>
)

export const usePokemon = () => {
  const context = useContext(PokemonContext)

  if (!context) {
    throw new Error('context must be used within an Provider')
  }

  return context
}

export function PokemonProvider({ children }: PokemonContextProps) {
  return (
    <PokemonContext.Provider value={usePokemonSource()}>
      {children}
    </PokemonContext.Provider>
  )
}
