<template>
  <div class=" rounded mt-2 text-left">
    <div v-on:click.self="isOpen = !isOpen" class="bg-green-600 text-white p-4 font-bold rounded cursor-pointer">{{ title }}
    </div>
    <div class="p-2 rounded bg-white" :class="isOpen ? 'd-block' : 'hidden'">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';

const isOpen = ref(false)
defineProps(['title'])
</script>