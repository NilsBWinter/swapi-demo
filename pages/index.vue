<template>
  <div class="overview">
    <h1>Characters</h1>
	<div class="overview__filters">
		<div>
			<select class="sw-select" ref="filmFilterSelect" @input="(event) => change()">
				<option :value="undefined">Filter by film</option>
				<option v-for="f in films" :key="f.id" :value="f.id">{{f.title}}</option>
			</select>
		</div>
	</div>
    <div class="overview__tile-grid">
      <Tile v-for="c in characters" :key="c.name" :modelValue="c"></Tile>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCharacterStore, Film } from "~/store/character";
import { usePlanetsStore } from "~/store/planets";

const characterStore = useCharacterStore();
const planetsStore = usePlanetsStore();

const filmFilterSelect = ref(null);

await Promise.all([
    await characterStore.updateCharacterList(),
    await characterStore.updateFilmsList(),
    await planetsStore.updatePlanetsList(),
]);

characterStore.updateFilmFilter(undefined);
const characters = computed(() => characterStore.getFilteredCharacterList);
const films = computed(() => characterStore.getFilmsList);

function change(): void {
    characterStore.updateFilmFilter(filmFilterSelect.value.value);
}

</script>

<style lang="scss">
.overview {
	text-align: center;
	margin-left: auto;
    margin-right: auto;
    padding: 16px;
  &__tile-grid {

    display: flex;
	flex-wrap: wrap;
    gap: 32px;
    justify-content: space-evenly;
  }
}
</style>
