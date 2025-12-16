import { SimplePokemon } from '@/pokemons';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PokemonsState {
  [key: string]: SimplePokemon
}

const initialState: PokemonsState = {
  '1': { id: '1', name: 'bulbasor' }
}

const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {

    toggleFavorite: (state, action: PayloadAction<SimplePokemon>) => {
      const pokemon = action.payload;
      const { id } = pokemon;

      if (!!state[id]) {
        // Si existe, lo eliminamos
        delete state[id];
        return;
      }

      // Si no existe, lo agregamos
      state[id] = pokemon;
    }
  }
});

export const { toggleFavorite } = pokemonsSlice.actions

export default pokemonsSlice.reducer