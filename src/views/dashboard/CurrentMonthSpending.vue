<template>
  <div class="mb-4 grid gap-2 space-x-1 px-5">
    <template v-if="monthShow">
      <div class="px-4 py-4 bg-white border-2 border-gray-400 rounded">
        <h3 class="text-2xl text-center text-gray-800">Pengeluaran bulan ini sebesar</h3>
        <p class="text-center text-gray-500">Rp. {{ store.total }}</p>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import useCurrentMonthSpendingStore from '@/store/dashboard/currentMonthSpending';
import useDashboardStore from '@/store/dashboard/useDashboardStore';
import { computed } from '@vue/reactivity';
import { ElLoading } from 'element-plus';
import { onMounted, watch } from 'vue';

const store = useCurrentMonthSpendingStore()
const dashboardStore = useDashboardStore()

const monthShow = computed(() => {
  console.log(store.month);
  if (store.month || store.month != '') {
    return store.month
  } else {
    return null
  }
})

onMounted(async() => {
  await handleGetData()
})

const handleGetData = async () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Mendapatkan data pengeluaran bulan ini...',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  await store.getCurrentMonthSpending()
  loading.close()
  dashboardStore.setIsPageReload(false)
  console.log('update',store.month);
} 

watch(() => dashboardStore.isPageReload, (first) => {
  if (first) handleGetData()
});
</script>