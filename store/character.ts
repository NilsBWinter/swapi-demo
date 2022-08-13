import axios from "axios";
import { extractIdFromSWAPIUrl } from "~~/utils/helper";

export const useCharacterStore = defineStore("characterStore", {
  state: (): CharacterStore => {
    return {
      // for initially empty lists
      characterList: [],
	  filteredCharacterList: [],
	  filmsList: [],

	  // filters
	  filmFilter: undefined,
    };
  },
  getters: {
    getCharacterList: (state) => state.characterList,
	getFilteredCharacterList: (state) => state.filteredCharacterList,
	getFilmsList: (state) => state.filmsList,
  },
  actions: {
    async updateCharacterList() {
      if (this.characterList.length === 0) {
        this.characterList = await requestCharacters();
      }
    },
	async updateFilmsList() {
		if (this.filmsList.length === 0) {
		  this.filmsList = await requestFilms();
		}

		this.filterCharacters();
	},
	filterCharacters() {
        const film = this.filmsList.find((f) => f.id === this.filmFilter);
		this.filteredCharacterList = this.characterList;
		if (film != null) {
			this.filteredCharacterList = this.characterList.filter((c) => film.characterIds.includes(c.id));
		}
	},
	updateFilmFilter(filmId: Film['id'] | string | undefined) {
        let id = filmId;
        if (typeof id === 'string') id = parseInt(id, 10);
		this.filmFilter = id;
		this.filterCharacters();
	}
  },
});

interface CharacterStore {
  characterList: Character[];
  filteredCharacterList: Character[];
  filmsList: Film[];

  // filter
  filmFilter: Film['id'] | undefined;
}

export interface Character {
  name: string;
  hair_color: string;
  eye_color: string;
  gender: string;
  homeworld: string;
  id: number;
}

export interface Film {
  title: string;
  id: number;
  episode_id: number;
  characters: string[];
  characterIds: number[];
  url: string;
}

async function requestCharacters(): Promise<Character[]> {
  // assuming pagination will not change
  const result = (
    await Promise.all(
      Array.from(Array(9).keys()).map((n) =>
        axios.get(`https://swapi.dev/api/people/?page=${n + 1}`)
      )
    )
  )
    .map((r) => r.data)
    .flatMap((c) => c.results);

  const chrs = result.map((c) => {
    return {
      ...c,
      id: extractIdFromSWAPIUrl(c.url),
    };
  });

  return chrs;
}

async function requestFilms(): Promise<Film[]> {
  // assuming pagination will not change
  const result = (
    await Promise.all([axios.get(`https://swapi.dev/api/films/`)])
  )
    .map((r) => r.data)
    .flatMap((c) => c.results);

  const flms = result.map((f) => {
    return {
      ...f,
      id: extractIdFromSWAPIUrl(f.url),
      characterIds: f.characters.map((c) => extractIdFromSWAPIUrl(c)),
    };
  });

  return flms;
}
