<template>
  <div class="grid gap-2 space-x-1 grid-cols-2 md:grid-cols-4 lg:grid-cols-6 px-5">
    <div v-for="spendingType in store.spendingByCategories" :key="spendingType.type" class="px-4 py-4 bg-white border-2 border-gray-400 rounded">
      <h3 class="text-2xl text-center text-gray-800">Rp. {{ spendingType.total }}</h3>
      <p class="text-center text-gray-500">{{ spendingType.type }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import useSpendByCategoryStore from '@/store/dashboard/spendByCategory';
import { onMounted } from 'vue';

const store = useSpendByCategoryStore()

onMounted(() => {
  store.getSpendingByCategory()
})
</script>