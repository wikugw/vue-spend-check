import addDate from '@/helper/dateHandle'
import addMonth from '@/helper/monthHandle'
import getDateNow from '@/helper/nowDateHandle'
import addYear from '@/helper/yearHandle'
import { defineStore } from 'pinia'
import { collection, addDoc } from "firebase/firestore";
import db from "@/firebase/index"

// You can name the return value of `defineStore()` anything you want, but it's best to use the name of the store and surround it with `use` and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
const useSpendFormStore = defineStore('spendForm', {
  state: () => ({
    form: {
      name: '',
      type: '',
      amount: null as null | number,
      createdAt: new Date()
    },
    spendingTypes: [
      'kos/ tempat tinggal',
      'makan/ minum',
      'belanja',
      'main/ hobi',
      'obat/ perawatan',
      'transport',
      'kirim kerumah',
      'lain - lain'
    ]
  }),
  // other options...
  actions: {
    async postSpending() {
      const now = getDateNow()
      console.log(this.form.amount);
      const year = await addYear(now.currYear, Number(this.form.amount))
      const month = await addMonth(now.currMonth, Number(this.form.amount), year.yearId)
      const date = await addDate(now.currDay, Number(this.form.amount), year.yearId, month.monthId)
      
      this.form.createdAt = new Date()
      await addDoc(collection(db, 'spending'), {
        ...this.form,
        ...year,
        ...month,
        ...date
      })
      
      this.form = {
        name: '',
        type: '',
        amount: null as null | number,
        createdAt: new Date()
      }
    },
  },
})

export default useSpendFormStore