import getDateNow from '@/helper/nowDateHandle'
import { defineStore } from 'pinia'
import { collection, getDocs, query, where } from "firebase/firestore";
import db from "@/firebase/index"

// You can name the return value of `defineStore()` anything you want, but it's best to use the name of the store and surround it with `use` and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
const useCurrentMonthSpendingStore = defineStore('currentMonthSpendding', {
  state: () => ({
    month: '',
    total: 0
  }),
  // other options...
  actions: {
    async getCurrentMonthSpending() {
      try {
        const now = getDateNow()
        this.month = now.currMonthName
        // console.log('now', now);
        const q = query(
          collection(db, "month"), 
          where("monthNumber", "==", now.currMonth),
        )
        const dateQuerySnapshot = await getDocs(q);
        if(!dateQuerySnapshot.empty) {
          dateQuerySnapshot.forEach((el) => {
            // console.log(el.id, el.data().name, el.data().type);
            this.total = el.data().total
          })
        }
        // console.log(this.spendingByCategories);
      } catch (error) {
        // console.log(error);
      }
    }
  },
})

export default useCurrentMonthSpendingStore