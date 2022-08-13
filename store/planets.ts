import axios from "axios";
import { extractIdFromSWAPIUrl } from "~/utils/helper";

export const usePlanetsStore = defineStore("planetsStore", {
  state: (): PlanetsStore => {
    return {
      // for initially empty lists
      planetsList: [],
    };
  },
  getters: {
    getPlanetsList: (state) => state.planetsList,
    getPlanetById: (state) => {
      return (id: number) => state.planetsList.find((p) => p.id === id);
    },
  },
  actions: {
    async updatePlanetsList() {
      if (this.planetsList.length === 0) {
		this.planetsList = await requestPlanets();
      }
    },
  },
});

interface PlanetsStore {
  planetsList: Planet[];
}

export interface Planet {
  name: string;
  id: number;
  url: string;
  climate: string;
  population: string;
  terrain: string;
}

async function requestPlanets(): Promise<Planet[]> {
  // assuming pagination will not change
  const result = (
    await Promise.all(
      Array.from(Array(6).keys()).map((n) =>
        axios.get(`https://swapi.dev/api/planets/?page=${n + 1}`)
      )
    )
  )
    .map((r) => r.data)
    .flatMap((c) => c.results);
  return result.map((p) => {
    return {
      ...p,
      id: extractIdFromSWAPIUrl(p.url),
    };
  });
}
