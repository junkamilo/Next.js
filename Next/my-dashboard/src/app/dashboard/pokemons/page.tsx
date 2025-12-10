
import { PokemonGrid, PokemonsResponse, SimplePokemon } from "@/pokemons";
import Image from "next/image";


interface Props {
    limit: number,
    offset: number
}

//hacemos una peticion get para traer todos los pokemons con un limit
const getPokemons = async ({ limit, offset }: Props): Promise<SimplePokemon[]> => {
    const data: PokemonsResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
        .then(res => res.json());

    const pokemons = data.results.map(pokemon => ({
        id: pokemon.url.split('/').at(-2)!,
        name: pokemon.name
    }));

    

    return pokemons
}


export default async function PokemonsPage() {
    //instanciamos la data get de pokemon pasandoles parametros
    const pokemons = await getPokemons({ limit: 151, offset: 0 });

    return (
        <div className="flex flex-col">

            <span className="text-5xl my-2">Listado de Pokemons <small>estatico</small></span>
            <PokemonGrid pokemons={ pokemons }/>
        </div>
    )
}