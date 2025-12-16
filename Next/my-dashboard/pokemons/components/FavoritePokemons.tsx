import { useAppSelector } from "@/src/store"
import { PokemonGrid } from "./PokemonGrid"

export const FavoritePokemons = () => {

    const favoritePokemons = useAppSelector(state => state.counterReducer);

  return (
    <PokemonGrid pokemons={[]}/>
  )
}
