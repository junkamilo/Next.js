import Link from "next/link"
import { SimplePokemon } from "../interfaces/simple-pokemons"
import Image from "next/image";
import { IoHeartOutline } from "react-icons/io5";

interface Props {
    pokemon: SimplePokemon;
}

export const PokemonCard = ({ pokemon }: Props) => {
    const { id, name } = pokemon;

    return (
        <div className="group relative w-full mx-auto max-w-sm">
            {/* Efecto de resplandor trasero al hacer hover (Glow effect) */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

            {/* Contenedor Principal de la Tarjeta */}
            <div className="relative bg-slate-900 rounded-2xl shadow-xl flex flex-col items-center overflow-hidden border border-slate-800 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl z-10">
                
                {/* 1. Fondo decorativo y Marca de Agua del ID */}
                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                    <span className="text-9xl font-black text-white">
                        #{id.toString().padStart(3, '0')}
                    </span>
                </div>

                {/* 2. Área de la Imagen (Floating Effect) */}
                <div className="relative z-10 mt-8 mb-4 w-40 h-40 flex items-center justify-center">
                    {/* Círculo difuso detrás del pokemon para resaltar */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
                    
                    <Image
                        key={pokemon.id}
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} // Usamos 'official-artwork' para mejor calidad si es posible, si no, usa la URL original
                        width={150}
                        height={150}
                        alt={pokemon.name}
                        //esta porpieda hace que las imagenes se carguen bajo demanda
                        priority={false}
                        className="object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] transform transition-transform duration-500 group-hover:scale-110"
                    />
                </div>

                {/* 3. Información del Pokemon */}
                <div className="text-center px-6 pb-6 w-full z-10">
                    <h2 className="text-2xl font-bold text-white capitalize tracking-wider mb-1">
                        {name}
                    </h2>
                    <p className="text-slate-400 text-sm mb-6">
                        Pokémon ID: {id}
                    </p>

                    {/* 4. Botones de Acción */}
                    <div className="flex items-center justify-between gap-4 border-t border-slate-700 pt-4">
                        
                        {/* Botón Ver Detalles */}
                        <Link
                            href={`/dashboard/pokemons/pokemon/${id}`} // Asumo que esta es la ruta
                            className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors text-center border border-slate-700 group-hover:border-slate-500"
                        >
                            Ver Detalles
                        </Link>

                        {/* Botón Favorito (Heart) */}
                        <button className="flex items-center justify-center p-2.5 rounded-lg bg-slate-800/50 hover:bg-red-500/20 border border-slate-700 hover:border-red-500 group/heart transition-all">
                            <IoHeartOutline className="w-6 h-6 text-slate-300 group-hover/heart:text-red-500 transition-colors" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
