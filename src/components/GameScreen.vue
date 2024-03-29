<template>
  <div class="px-4 pb-14 dark:bg-slate-700">
    <div class="text-center mb-10 pt-12 text-slate-600 dark:text-slate-200">
      <h2 class="text-4xl font-bold font-display mb-5">{{ game.title }}</h2>
      <p class="font-light">{{ game.description }}</p>
    </div>

    <div class="max-w-full sm:max-w-md m-auto mb-10 py-5 px-10 z-10 text-center sticky top-10 backdrop-blur-lg rounded-lg shadow-xl text-slate-600 dark:text-slate-200">

      <div class="text-xs mb-1">
        <GameControl :disabled="!started" @click="restart">Start over</GameControl>
        |
        <GameControl :disabled="!started || ended" @click.native="pause">{{ paused ? 'Resume' : 'Pause'}}</GameControl>
        |
        <GameControl :disabled="!started || ended" @click="end">Give up</GameControl>
      </div>

      <input v-if="!ended" type="text" v-model="playerInput" :disabled="ended"
             class="border py-1 px-2 dark:bg-slate-600 dark:border-slate-500"
             placeholder="Enter a Pokemon's name"
             @input="guess">

      <div class="text-xl font-display font-bold mt-3 mb-2" :class="{'text-red-600': timeRemaining < 10}">{{ timer }}</div>

      <div class="font-light">
        <span v-if="!ended">Progress:</span>
        <span v-else>Result:</span>
        <span class="ml-1">{{ guessed.length }} / {{ answers.length }}</span>
      </div>

      <div class=" h-[0.25em] w-full mt-2 bg-slate-100 dark:bg-slate-600">
        <div class="h-full left-0 bg-cerulean" :style="`width: ${progress}%`"></div>
      </div>

      <div v-if="ended" class="mt-5">
        <div class="text-sm font-light">Your Pokemon trainer rank:</div>
        <div class="text-2xl font-display text-emerald-500">{{playerRank}}</div>
      </div>
    </div>

    <div>
      <div class="flex flex-row flex-wrap justify-center"
           :class="{'grayscale': paused}"
      >
        <Answer
            v-for="answer in answers" :key="answer.id"
            :answer="answer"
            :guessed="!paused && guessed.includes(answer.id)"
            :missed="ended && !guessed.includes(answer.id)">
        </Answer>
      </div>
    </div>
  </div>

  <div class="bottom-0 pt-8 pb-8 text-center text-sm bg-slate-50 dark:bg-slate-600 text-slate-600 dark:text-slate-200 font-thin">
    <a href="https://github.com/nejc-susin/pokemon-quiz" target="_blank">See the source on GitHub</a>
  </div>

</template>

<script setup lang="ts">

import GameControl from "@/components/GameControl.vue";

type Answer = {
  id: number,
  label: string,
  img: string,
}

import {computed, ref} from 'vue';
import pokemon from '@/assets/pokemon.json';
import Answer from '@/components/Answer.vue';

const game = {
  title: 'Original 151 Pokemon Quiz',
  description: 'Can you name all the Kanto region Pokemon from the original Red, Blue and Yellow Versions in under 15 minutes?',
  timeLimit: 900,
  ranks: ['Beginner', 'Novice', 'Normal', 'Serious', 'Great', 'Advanced', 'Pro', 'Ultra', 'Expert', 'Legendary', 'Pokemon Master'],
}
const answers = pokemon;

let started = ref<boolean>(false);
let ended = ref<boolean>(false);
let paused = ref<boolean>(false);
let guessed = ref<number[]>([]);
let interval: number | undefined = undefined;

let playerInput = ref('');
let timeRemaining = ref(game.timeLimit);

const progress = computed(() => {
  return (guessed.value.length / answers.length) * 100;
});

const playerRank = computed(() => {
  const quarter = Math.floor(progress.value/10);
  return game.ranks[quarter];
});

let timer = computed(() => {
  if (timeRemaining.value <= 0) {
    return 'Time\'s up!';
  }
  const minutes = Math.floor(timeRemaining.value / 60);
  const seconds = timeRemaining.value % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
});

function guess(evt: InputEvent) {
  if (!started.value) {
    startGame();
  }
  const target = evt?.target as HTMLInputElement;
  let guess = target.value.trim().toLowerCase();
  let match: Answer | undefined = answers.find(a => a.label.toLowerCase() === guess && !guessed.value.includes(a.id));
  if (match && !guessed.value.includes(match.id)) {
    guessed.value.push(match.id);
    playerInput.value = '';
  }
  if (guessed.value.length >= answers.length) {
    stopGame();
  }
}

function startGame() {
  interval = window.setInterval(() => {
    if (paused.value) {
      return;
    }
    timeRemaining.value -= 1;
    if (timeRemaining.value <= 0) {
      stopGame();
    }
  },1000);
  started.value = true;
}

function stopGame() {
  ended.value = true;
  window.clearInterval(interval);
}

function pause() {
  paused.value = !paused.value;
}

function restart() {
  location.reload();
}

function end() {
  if (paused.value) {
    pause();
  }
  stopGame();
}
</script>

<style scoped>

</style>