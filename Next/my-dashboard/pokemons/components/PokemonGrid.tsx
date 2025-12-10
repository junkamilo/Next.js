import Image from "next/image";
import { SimplePokemon } from "../interfaces/simple-pokemons"
import { PokemonCard } from "./PokemonCard";

interface Props{
    pokemons:SimplePokemon[];
}

export const PokemonGrid = ({pokemons}:Props
) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 px-4">
            {
                pokemons.map(pokemon => (
                    <PokemonCard key={pokemon.id } pokemon={ pokemon }/>
                ))
            }
        </div>
    )
}
