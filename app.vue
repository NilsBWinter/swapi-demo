<template>
  <div class="app">
    <!-- <NuxtWelcome /> -->
    <NuxtPage />
  </div>
</template>

<style lang="scss">

body {
  background-color: #272b30;
  color: gold;
}

.app {
    font-size: larger;
}

.clickable {
  &:hover {
    cursor: pointer;
  }
}

.sw-select {
  font-size: 24px;
  border-radius: 8px;
  background-color: black;
  color: gold;
  border-color: gold;
  padding: 8px;
  margin: 16px;

  &:focus-visible {
    border-color: gold;
    outline: unset;
  }
}
</style>
