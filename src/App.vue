<script setup lang="ts">
import {ref} from "vue";
import MoonIcon from "@/components/icons/MoonIcon.vue";
import GameScreen from "@/components/GameScreen.vue";

const darkMode = ref(false);
function toggleDarkMode() {
  darkMode.value = !darkMode.value;
}
</script>

<template>
  <div class="absolute right-5 top-3 cursor-pointer group" @click="toggleDarkMode">
    <MoonIcon class="inline w-5 h-5 mr-1 align-middle fill-slate-300 group-hover:fill-slate-400"></MoonIcon>
    <span class="align-middle text-slate-300 group-hover:text-slate-400">Dark mode</span>
  </div>
  <div :class="{dark: darkMode}">
    <GameScreen></GameScreen>
  </div>
</template>

<style>
@import '@/assets/base.css';
@import url('https://fonts.googleapis.com/css2?family=Carter+One&display=swap');

body {
  min-width: 300px;
}

.font-display {
  font-family: 'Carter One', cursive;
}
</style>
