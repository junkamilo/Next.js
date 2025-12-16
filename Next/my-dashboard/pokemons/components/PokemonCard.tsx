'use client'

import Link from "next/link"
import Image from "next/image";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useAppSelector, useAppDispatch } from "@/src/store";

// Asegúrate de importar tu acción aquí

import { SimplePokemon } from "../interfaces/simple-pokemons";
import { toggleFavorite } from "@/src/store/pokemons/pokemons";


interface Props {
    pokemon: SimplePokemon;
}

export const PokemonCard = ({ pokemon }: Props) => {

    const { id, name } = pokemon;

    // 1. Hooks de Redux
    const dispatch = useAppDispatch();
    // Nota: Ajusta 'state.pokemons' según como hayas nombrado tu reducer en el store (pokemons o pokemonsReducer)
    const isFavorite = useAppSelector(state => !!state.pokemonsReducer[id]);

    // 2. Handler para el click
    const onToggle = () => {
        dispatch(toggleFavorite(pokemon));
    }

    return (
        <div className="group relative w-full mx-auto max-w-sm">
            {/* ... (Todo tu código del efecto glow y fondo se mantiene igual) ... */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

            <div className="relative bg-slate-900 rounded-2xl shadow-xl flex flex-col items-center overflow-hidden border border-slate-800 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl z-10">

                {/* ... (Imagen y ID se mantienen igual) ... */}
                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                    <span className="text-9xl font-black text-white">#{id.toString().padStart(3, '0')}</span>
                </div>

                <div className="relative z-10 mt-8 mb-4 w-40 h-40 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
                    <Image
                        key={pokemon.id}
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                        width={150}
                        height={150}
                        alt={pokemon.name}
                        priority={false}
                        className="object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] transform transition-transform duration-500 group-hover:scale-110"
                    />
                </div>

                <div className="text-center px-6 pb-6 w-full z-10">
                    <h2 className="text-2xl font-bold text-white capitalize tracking-wider mb-1">{name}</h2>
                    <p className="text-slate-400 text-sm mb-6">Pokémon ID: {id}</p>

                    <div className="flex items-center justify-between gap-4 border-t border-slate-700 pt-4">

                        <Link
                            href={`/dashboard/pokemons/pokemon/${id}`}
                            className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors text-center border border-slate-700 group-hover:border-slate-500"
                        >
                            Ver Detalles
                        </Link>

                        {/* 3. Botón de Favorito Estructurado */}
                        <div
                            onClick={onToggle}
                            className="cursor-pointer transition-transform active:scale-90" // Efecto de click
                        >
                            <div className={`
                                flex items-center justify-center p-2.5 rounded-lg border transition-all duration-300
                                ${isFavorite
                                    ? 'bg-red-500/10 border-red-500 text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]' // Estilo ACTIVO
                                    : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-red-500/20 hover:border-red-500 hover:text-red-500' // Estilo INACTIVO
                                }
                            `}>
                                {isFavorite ? (
                                    <IoHeart className="w-6 h-6 animate-pulse-short" /> // Icono Lleno
                                ) : (
                                    <IoHeartOutline className="w-6 h-6" /> // Icono Vacío
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}