<template>
  <div class="grid mx-auto p-5 bg-white rounded-lg w-3/4">
    <form>
        <div class="grid gap-6 mb-6">
            <div>
                <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nama Pengeluaran</label>
                <el-input v-model="form.name" size="large" placeholder="Please input" clearable />
            </div>
            <div>
                <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Jenis Pengeluaran</label>
                <el-select v-model="form.type" placeholder="Select" size="large" class="w-full">
                    <el-option v-for="item in spendingTypes" :key="item" :label="item" :value="item" />
                </el-select>
            </div>
            <div>
                <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Total Pengeluaran</label>
                <el-input @keypress="onlyNumber" v-model="form.amount" size="large" placeholder="Please input" clearable />
            </div>  
        </div>
        <button @click.prevent="handlePostSpending()" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import useSpendFormStore from '@/store/spending/form';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const formStore = useSpendFormStore()
const spendingTypes = formStore.spendingTypes
const router = useRouter()

const form = computed(() => {
  return formStore.form
})

const handlePostSpending = () => {
  formStore.postSpending().then(() => {
    router.push({ name: 'home'})
  })
}

const onlyNumber = ($event) => {
  let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
  if ((keyCode < 48 || keyCode > 57)) {
    $event.preventDefault();
  }
}
</script>