<template>
  <div class="mx-1 my-2 px-1 py-1  w-[80px] flex flex-col items-center justify-between"
  :class="{'border-2 border-red-600 bg-red-100 dark:bg-red-900 rounded-lg': missed}">

    <img :src="revealed ? imgUrl : unknownUrl" class="">

    <div class="text-sm text-center text-slate-600 dark:text-slate-200">
      <div class="text-sm mt-1 font-bold">#{{ answer.id }}</div>
      <span v-if="!revealed">?</span>
      <span v-else>{{ answer.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

const props = defineProps({
  answer: {
    type: Object,
    required: true,
  },
  guessed: {
    type: Boolean,
    default: false,
  },
  missed: {
    type: Boolean,
    default: false,
  },
})
let imgUrl = ref('');
let unknownUrl = new URL(`../assets/img/pokemon/unknown.png`, import.meta.url).href;

let revealed = computed(() => props.guessed || props.missed)

onMounted(() => {
  imgUrl.value = new URL(`../assets/img/pokemon/${props.answer.id}.png`, import.meta.url).href;
})
</script>

<style scoped>

</style>