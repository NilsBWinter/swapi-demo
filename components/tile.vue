<template>
  <div v-if="character" class="tile">
    <div>Name: {{ character.name }}</div>
    <div>Hair: {{ character.hair_color }}</div>
    <div>Eyes: {{ character.eye_color }}</div>
    <div>Gender: {{ character.gender }}</div>
    <div class="clickable" @click="$router.push(`/planets/${characterPlanet.id}`)" >Planet: {{ characterPlanet?.name }}</div>
  </div>
</template>

<script setup lang="ts">
import { Character, useCharacterStore } from "~/store/character";
import { Planet, usePlanetsStore } from "~/store/planets";
import { extractIdFromSWAPIUrl } from "~~/utils/helper";

const planetsStore = usePlanetsStore();

const props = defineProps({
  modelValue: {
    type: Object as () => Character,
    required: true,
  },
});

const character = computed(() => props.modelValue);

const characterPlanet = computed(
  (): Planet =>
    planetsStore.getPlanetById(extractIdFromSWAPIUrl(character.value.homeworld))
);
</script>

<style scoped lang="scss">
.tile {
    padding: 16px;
    width: 400px;

    background-color: black;
    color: gold;

    border: 1px solid black;
    border-radius: 8px;
    box-shadow: 5px 5px 10px black;

    text-align: left;
}
</style>
