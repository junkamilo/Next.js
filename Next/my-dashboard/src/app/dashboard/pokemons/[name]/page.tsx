import { Pokemon } from "@/pokemons";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Props {
    params: { name: string };
}

//se ejecutara en build time
//hacer un npm run build para que funcione
//estos hace que creamos de manera estaticas 151 paginas de maneras automaticas antes de que el usuario las solicite y el servidor las cargue.
export async function generateStaticParams() {

    const static151Pokemons = Array.from({length:151}).map((v,i)=>`${i + 1}`);

    return static151Pokemons.map(id=>({
        id:id
    }))
}

// Generar Metadata dinámica (Opcional pero recomendado para SEO)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    try {
        const { name } = await params; // En Next.js 15 params es una promesa
        const pokemon = await getPokemon(name);
        return {
            title: `#${pokemon.id} - ${pokemon.name}`,
            description: `Página del pokemon ${pokemon.name}`
        }
    } catch (error) {
        return {
            title: 'Página de Pokémon',
            description: 'Pokémon no encontrado'
        }
    }
}

const getPokemon = async (id: string): Promise<Pokemon> => {
    try {
        const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
            cache: 'force-cache',
            next: {
                revalidate: 60 * 60 * 24 * 30 // Cache por 30 días (ejemplo)
            }
        }).then(resp => {
            // Si la API no encuentra el pokemon, lanzamos error
            if (!resp.ok) throw new Error('No se encontró el pokemon');
            return resp.json();
        });

        console.log(`Se cargó el pokemon: ${pokemon.name}`);
        return pokemon;

    } catch (error) {
        // Si hay error, llamamos a notFound() de Next.js
        notFound();
    }
}

// 1. El componente DEBE ser 'async' para poder esperar los datos
export default async function PokemonPage({ params }: Props) {

    // 2. Esperamos a que los params estén listos (Next.js 15+ requiere await, versiones anteriores no estorba)
    const { name } = await params;

    // 3. Esperamos (await) a que la data llegue
    const pokemon = await getPokemon(name);

    return (
        <div className="min-h-screen w-full bg-slate-950 text-slate-300 relative overflow-hidden flex justify-center items-center py-10 px-4">

            {/* --- FONDO AMBIENTAL (Background Globs) --- */}
            {/* Estas manchas de color le dan vida al fondo oscuro */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px]"></div>
            </div>

            {/* --- TARJETA PRINCIPAL (Glassmorphism) --- */}
            <div className="relative w-full max-w-5xl bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-[30px] shadow-2xl overflow-hidden animate-fade-in-up">

                {/* HEADER: Nombre e ID */}
                <div className="flex flex-col md:flex-row items-center justify-between p-8 border-b border-white/5 bg-white/5">
                    <div className="flex flex-col">
                        <span className="text-slate-500 text-lg font-mono">#{pokemon.id}</span>
                        <h1 className="text-4xl md:text-5xl font-black text-white capitalize tracking-tight">
                            {pokemon.name}
                        </h1>
                    </div>

                    {/* Tipos como Badges Neon */}
                    <div className="flex gap-3 mt-4 md:mt-0">
                        {pokemon.types.map(type => (
                            <span key={type.slot} className="px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 font-bold uppercase tracking-widest text-xs shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                                {type.type.name}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">

                    {/* --- COLUMNA IZQUIERDA: HERO IMAGE --- */}
                    <div className="lg:col-span-5 p-8 flex flex-col items-center justify-center bg-gradient-to-b from-slate-800/30 to-slate-900/30 border-r border-white/5 relative">

                        {/* Efecto de anillo detrás de la imagen */}
                        <div className="absolute w-64 h-64 border border-dashed border-white/10 rounded-full animate-spin-slow"></div>
                        <div className="absolute w-52 h-52 border border-white/5 rounded-full"></div>

                        <div className="relative z-10 hover:scale-110 transition-transform duration-500 cursor-pointer">
                            <Image
                                src={pokemon.sprites.other?.dream_world.front_default ?? '/no-image.png'}
                                width={300}
                                height={300}
                                alt={`Imagen del pokemon ${pokemon.name}`}
                                className="drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)]"
                                priority
                            />
                        </div>

                        {/* Dato de Peso destacado */}
                        <div className="mt-8 flex items-center gap-2 bg-slate-950/50 px-6 py-3 rounded-xl border border-white/10">
                            <span className="text-slate-400 text-xs uppercase">Peso</span>
                            <span className="text-xl font-bold text-white">{pokemon.weight} kg</span>
                        </div>
                    </div>

                    {/* --- COLUMNA DERECHA: DATOS TÉCNICOS --- */}
                    <div className="lg:col-span-7 p-8 flex flex-col gap-8">

                        {/* SECCIÓN 1: Sprites Comparativos (Grid de cristal) */}
                        <div>
                            <h3 className="text-sm font-bold text-slate-500 uppercase mb-4 tracking-wider flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                Apariencia
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                {/* Normal */}
                                <div className="bg-slate-800/40 rounded-xl p-4 flex flex-col items-center border border-white/5 hover:border-white/10 transition-colors group">
                                    <span className="text-xs text-slate-500 mb-2">Default</span>
                                    <div className="flex gap-4">
                                        <Image src={pokemon.sprites.front_default} width={80} height={80} alt="Front" className="opacity-70 group-hover:opacity-100 transition-opacity" />
                                        <Image src={pokemon.sprites.back_default} width={80} height={80} alt="Back" className="opacity-70 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </div>
                                {/* Shiny */}
                                <div className="bg-slate-800/40 rounded-xl p-4 flex flex-col items-center border border-yellow-500/20 hover:border-yellow-500/40 transition-colors group">
                                    <span className="text-xs text-yellow-500/70 mb-2 flex items-center gap-1">
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                        Shiny
                                    </span>
                                    <div className="flex gap-4">
                                        <Image src={pokemon.sprites.front_shiny} width={80} height={80} alt="Front Shiny" className="opacity-70 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_10px_rgba(234,179,8,0.3)]" />
                                        <Image src={pokemon.sprites.back_shiny} width={80} height={80} alt="Back Shiny" className="opacity-70 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_10px_rgba(234,179,8,0.3)]" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SECCIÓN 2: Moves (Data Stream) */}
                        <div className="flex-1 flex flex-col min-h-0">
                            <h3 className="text-sm font-bold text-slate-500 uppercase mb-4 tracking-wider flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                                Movimientos
                            </h3>

                            {/* Contenedor con Scroll personalizado */}
                            <div className="flex flex-wrap gap-2 overflow-y-auto max-h-60 pr-2 custom-scrollbar">
                                {pokemon.moves.map(move => (
                                    <span
                                        key={move.move.name}
                                        className="px-3 py-1 text-xs text-slate-300 bg-slate-800/50 border border-slate-700 rounded hover:bg-slate-700 hover:text-white transition-colors cursor-default capitalize"
                                    >
                                        {move.move.name.replace('-', ' ')}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}