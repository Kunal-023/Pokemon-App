import { create } from "zustand";

type Pokemon = any;
interface PokemonStore {
  favourites: Pokemon[];
  searchTerm: string;
  page: number;
  limit: number;
  currLink: string;
  pokemonType: string;

  addFavourite: (pokemon: Pokemon) => void;
  removeFavourite: (name: string) => void;
  setSearchTerm: (term: string) => void;
  setPage: (page: number) => void;
  setCurrLink: (link: string) => void;
  setPokemonType: (type: string) => void;
}

export const usePokemonStore = create<PokemonStore>((set) => ({
  favourites: [],
  searchTerm: "",
  page: 1,
  limit: 20,
  currLink: `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`,
  pokemonType: "",

  addFavourite: (pokemon) =>
    set((state) => ({ favourites: [...state.favourites, pokemon] })),
  removeFavourite: (name) =>
    set((state) => ({
      favourites: state.favourites.filter((p) => p.name !== name),
    })),
  setSearchTerm: (term) => set({ searchTerm: term }),
  setPage: (page) => set({ page }),
  setCurrLink: (link) => set({ currLink: link }),
  setPokemonType: (pokemonType) => set({ pokemonType: pokemonType }),
}));
