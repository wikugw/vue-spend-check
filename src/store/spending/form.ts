import addDate, { updateDate } from '@/helper/dateHandle'
import addMonth, { updateMonth } from '@/helper/monthHandle'
import getDateNow from '@/helper/nowDateHandle'
import addYear, { updateAmountYear } from '@/helper/yearHandle'
import { defineStore } from 'pinia'
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import db from "@/firebase/index"
import { SpendingItem } from '@/type/SpendingItems'

// You can name the return value of `defineStore()` anything you want, but it's best to use the name of the store and surround it with `use` and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
const useSpendFormStore = defineStore('spendForm', {
  state: () => ({
    form: {
      id: '',
      name: '',
      type: '',
      amount: null as null | number,
      createdAt: ''
    } as SpendingItem,
    spendingTypes: [
      'kos/ tempat tinggal',
      'makan/ minum',
      'belanja',
      'main/ hobi',
      'obat/ perawatan',
      'transport',
      'kirim kerumah',
      'lain - lain'
    ],
    isEdit: false
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
      const {id, ...postDataForm} = this.form
      await addDoc(collection(db, 'spending'), {
        ...postDataForm,
        ...year,
        ...month,
        ...date
      })
      
      this.resetForm()
    },
    editSpending(payload: SpendingItem) {
      this.form = payload
      this.isEdit = true
    },
    resetForm() {
      this.form = {
        id: '',
        name: '',
        type: '',
        amount: null as null | number,
        createdAt: new Date()
      }
      this.isEdit = false
    },
    async putSpending() {
      const now = getDateNow()
      console.log(this.form.amount);

      const docRef = doc(db, "spending", this.form.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const formerAmount = docSnap.data().amount
        console.log('🏓 uang awal', formerAmount);
        console.log('🙈 uang baru', this.form.amount);

        const washingtonRef = doc(db, "spending", this.form.id);  
        // Set the "capital" field of the city 'DC'
        await updateDoc(washingtonRef, {
          name: this.form.name,
          type: this.form.type,
          amount: this.form.amount
        });

        const year = await updateAmountYear(now.currYear, Number(this.form.amount), formerAmount)
        const month = await updateMonth(now.currMonth, Number(this.form.amount), year.yearId, formerAmount)
        const date = await updateDate(now.currDay, Number(this.form.amount), year.yearId, month.monthId, formerAmount)
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
      this.resetForm()
    }
  },
})

export default useSpendFormStore