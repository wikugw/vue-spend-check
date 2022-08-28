<template>
  <div class="pt-10 px-5">
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

const store = useDailtSpentPerMonthStore()
onMounted(() => {
  store.getDailySpent()
})
</script>