<template>
  <div class="pt-4 px-5">
    <Accordion v-for="day in store.dailySpentArr" 
      :key="day.date" 
      :title="`${day.date} ${store.month} - Rp.${day.total}`"
    >
      <div v-for="item in day.SpendingItems" :key="item.name">
        {{ item.name }} - Rp.{{ item.amount }}
      </div>
    </Accordion>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import Accordion from '@/components/Accordion.vue';
import useDailtSpentPerMonthStore from '@/store/dashboard/dailySpentPerMonth';
import { ElLoading } from 'element-plus';

const store = useDailtSpentPerMonthStore()
onMounted(async () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Mendapatkan data pengeluaran bulan ini...',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  await store.getDailySpent()
  loading.close()
})
</script>