<template>
  <div class="mx-2 my-3  w-[80px] flex flex-col items-center justify-between">

    <img :src="hidden ? unknownUrl : imgUrl" class="">

    <div class="text-sm text-center text-slate-700">
      <div class="text-sm font-bold">#{{ answer.id }}</div>
      <span v-if="hidden">?</span>
      <span v-else>{{ answer.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";

const props = defineProps({
  answer: {
    type: Object,
    required: true,
  },
  hidden: {
    type: Boolean,
    default: true,
  }
})
let imgUrl = ref('');
let unknownUrl = new URL(`../../assets/img/pokemon/unknown.png`, import.meta.url).href;

onMounted(() => {
  imgUrl.value = new URL(`../../assets/img/pokemon/${props.answer.id}.png`, import.meta.url).href;
})
</script>

<style scoped>

</style>