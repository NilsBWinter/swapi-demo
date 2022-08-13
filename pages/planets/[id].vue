<template>
  <div v-if="planet" class="planet">
    <div class="planet__title">
        <div class="clickable" @click="$router.push(`/`)">Back</div>
      <h1>Planet: {{ planet.name }}</h1>
    </div>

    <div class="planet__info">
      <div>Name: {{ planet.name }}</div>
      <div>Population: {{ planet.population }}</div>
      <div>Terrain: {{ planet.terrain }}</div>
      <div>Climate: {{ planet.climate }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Planet, usePlanetsStore } from "~/store/planets";

const route = useRoute();

const planetsStore = usePlanetsStore();
await planetsStore.updatePlanetsList();

const id = computed(() => Array.isArray(route.params.id) ? route.params.id[0] : route.params.id);

const planet = computed(
  (): Planet => planetsStore.getPlanetById(parseInt(id.value, 10))
);
</script>

<style lang="scss">
.planet{
        text-align: center;
}
</style>
