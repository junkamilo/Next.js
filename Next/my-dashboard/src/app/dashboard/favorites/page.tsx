
import { FavoritePokemons, PokemonGrid, PokemonsResponse, SimplePokemon } from "@/pokemons";




interface Props {
    limit: number,
    offset: number
}

export const metadata = {
    title:'Favoritos',
    description:'Admin sit cuidate sulpa consectuer'
}


export default async function PokemonsPage() {
    //instanciamos la data get de pokemon pasandoles parametros


    return (
        <div className="flex flex-col">

            <span className="text-5xl my-2">Listado de Pokemons <small>estatico</small></span>
            {/* <PokemonGrid pokemons={ [] }/> */}
            <FavoritePokemons/>
        </div>
    )
}