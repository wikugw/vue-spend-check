<template>
  <div class="grid mx-auto p-5 bg-white rounded-lg w-3/4">
    <el-form
      ref="ruleFormRef"
      :model="form"
      :rules="rules"
      status-icon
      label-position="top"
      scroll-to-error
    >
        <div class="grid gap-6 mb-6">
          <div>
            <el-form-item label="Nama Pengeluaran" prop="name">
              <el-input v-model="form.name" size="large" placeholder="Please input" clearable />
            </el-form-item>
          </div>
          <div>
            <el-form-item label="Jenis Pengeluaran" prop="type">
              <el-select v-model="form.type" placeholder="Select" size="large" class="w-full" clearable>
                <el-option v-for="item in spendingTypes" :key="item" :label="item" :value="item" />
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="Total Pengeluaran" prop="amount">
              <el-input @keypress="onlyNumber" v-model="form.amount" size="large" placeholder="Please input" clearable />
            </el-form-item>
          </div>  
        </div>
        <button @click.prevent="handleBackToHome" class="text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-1 my-1">Back</button>
        <button @click.prevent="resetForm(ruleFormRef)" class="text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-1 my-1">Reset</button>
        <button @click.prevent="submitForm(ruleFormRef)" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-1 my-1">Update</button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import useSpendFormStore from '@/store/spending/form';
import { ElLoading, ElNotification, FormInstance, FormRules } from 'element-plus';
import Swal from 'sweetalert2';
import { h, reactive, computed, ref, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const formStore = useSpendFormStore()
const spendingTypes = formStore.spendingTypes
const router = useRouter()
const ruleFormRef = ref<FormInstance>()

  const rules = reactive<FormRules>({
  name: [
    { required: true, message: 'Nama Pengeluaran wajib diisi', trigger: 'blur' },
  ],
  type: [
    {
      required: true,
      message: 'Jenis Pengeluaran wajib diisi',
      trigger: 'change',
    },
  ],
  amount: [
    {
      required: true,
      message: 'Total Pengeluaran harus diisi',
      trigger: 'blur',
    },
  ],
  date1: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a date',
      trigger: 'change',
    },
  ],
})

const form = computed(() => {
  return formStore.form
})

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      handlePostSpending()
    } else {
      console.log('error submit!', fields)
    }
  })
}

const handlePostSpending = () => {
  Swal.fire({
    title: 'Apakah anda memperbarui pengeluaran ini?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'OK',
    cancelButtonText: 'Batal',
  }).then( async (result)=> {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      const loading = ElLoading.service({
        lock: true,
        text: 'Memperbarui data pengeluaran...',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      formStore.putSpending().then(() => {
        loading.close()
        handleBackToHome()
        ElNotification({
          title: 'Success',
          message: h('i', { style: 'color: teal' }, 'Berhasil memperbarui pengeluaran'),
        })
      })
    }
  })
}

const onlyNumber = ($event) => {
  let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
  if ((keyCode < 48 || keyCode > 57)) {
    $event.preventDefault();
  }
}

const handleBackToHome = () => {
  router.push({ name: 'home'})
}

onUnmounted(() => {
  formStore.resetForm()
})
</script>