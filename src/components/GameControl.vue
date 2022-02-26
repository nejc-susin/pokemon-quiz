<template>
  <button
    class="underline"
    :class="{
      'text-cerulean-500 cursor-pointer': !disabled,
      'text-slate-600 dark:text-slate-200 cursor-default': disabled
    }"
    @click="clicked">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">

const emits = defineEmits(['click']);

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
})

function clicked() {
  if (!props.disabled) {
    emits('click');
  }
}

</script>

<style scoped>

</style>