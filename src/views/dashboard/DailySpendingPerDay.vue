<template>
  <div class="pt-4 px-5">
    <Accordion v-for="day in store.dailySpentArr" 
      :key="day.date" 
      :title="`${day.date} ${store.month} - Rp.${day.total}`"
    >
      <div v-for="item in day.SpendingItems" :key="item.id">
        {{ item.name }} - Rp.{{ item.amount }} 
        <el-button type="success" :icon="Edit" circle @click="handleRedirectEdit(item)" />
        <el-button type="danger" :icon="Remove" circle @click="handleRemove(item)" />
      </div>
    </Accordion>
  </div>
</template>

<script lang="ts" setup>
import { h, onMounted, onUnmounted, watch } from 'vue';
import Accordion from '@/components/Accordion.vue';
import useDailtSpentPerMonthStore from '@/store/dashboard/dailySpentPerMonth';
import { ElLoading, ElNotification } from 'element-plus';
import { Edit, Remove } from '@element-plus/icons-vue'
import { SpendingItem } from '@/type/SpendingItems';
import useSpendFormStore from '@/store/spending/form';
import { useRouter } from 'vue-router';
import useDashboardStore from '@/store/dashboard/useDashboardStore'
import Swal from 'sweetalert2';

const store = useDailtSpentPerMonthStore()
const router = useRouter()
const fromStore = useSpendFormStore()
const dashboardStore = useDashboardStore()
onMounted(async () => {
  await handleGetData()
})

const handleGetData = async () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Mendapatkan data pengeluaran bulan ini...',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  await store.getDailySpent()
  loading.close()
  dashboardStore.setIsPageReload(false)
}

const handleRedirectEdit = (item: SpendingItem) => {
  fromStore.editSpending(item)
  router.push({ name: 'Edit'})
}

const handleRemove = async (item: SpendingItem) => {
  Swal.fire({
    title: 'Apakah anda ingin menghapus pengeluaran ini?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'OK',
    cancelButtonText: 'Batal',
  }).then( async (result)=> {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      const loading = ElLoading.service({
        lock: true,
        text: 'Menghapus data pengeluaran...',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      await store.removeSpendingItem(item).then(() => {
        loading.close()
        ElNotification({
          title: 'Success',
          message: h('i', { style: 'color: teal' }, 'Berhasil menghapus pengeluaran'),
        })
      })
      dashboardStore.setIsPageReload(true)
    }
  })
}

watch(() => dashboardStore.isPageReload, (first) => {
  if (first) handleGetData()
});
</script>