<template>
  <div class="mb-4 grid gap-2 space-x-1 px-5">
    <div  class="px-4 py-4 bg-white border-2 border-gray-400 rounded">
      <h3 class="text-2xl text-center text-gray-800">Pengeluaran bulan ini sebeesar</h3>
      <p class="text-center text-gray-500">Rp. {{ store.total }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import useCurrentMonthSpendingStore from '@/store/dashboard/currentMonthSpending';
import { ElLoading } from 'element-plus';
import { onMounted } from 'vue';

const store = useCurrentMonthSpendingStore()

onMounted(async() => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Mendapatkan data pengeluaran bulan ini...',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  store.getCurrentMonthSpending()
  loading.close()
})
</script>