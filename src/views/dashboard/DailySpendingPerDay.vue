<template>
  <div class="pt-4 px-5">
    <Accordion v-for="day in store.dailySpentArr" 
      :key="day.date" 
      :title="`${day.date} ${store.month} - Rp.${day.total}`"
    >
      <div v-for="item in day.SpendingItems" :key="item.id">
        {{ item.name }} - Rp.{{ item.amount }} 
        <el-button type="success" :icon="Edit" circle @click="handleRedirectEdit(item)" />
      </div>
    </Accordion>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import Accordion from '@/components/Accordion.vue';
import useDailtSpentPerMonthStore from '@/store/dashboard/dailySpentPerMonth';
import { ElLoading } from 'element-plus';
import { Edit } from '@element-plus/icons-vue'
import { SpendingItem } from '@/type/SpendingItems';
import useSpendFormStore from '@/store/spending/form';
import { useRouter } from 'vue-router';

const store = useDailtSpentPerMonthStore()
const router = useRouter()
const fromStore = useSpendFormStore()
onMounted(async () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Mendapatkan data pengeluaran bulan ini...',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  await store.getDailySpent()
  loading.close()
})

const handleRedirectEdit = (item: SpendingItem) => {
  fromStore.editSpending(item)
  router.push({ name: 'Edit'})
}
</script>