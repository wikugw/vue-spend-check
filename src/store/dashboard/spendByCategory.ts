import getDateNow from '@/helper/nowDateHandle'
import { defineStore } from 'pinia'
import { collection, getDocs, query, where } from "firebase/firestore";
import db from "@/firebase/index"
import { SpendingTypePerMonth } from '@/type/spendingTypePerMonth';

// You can name the return value of `defineStore()` anything you want, but it's best to use the name of the store and surround it with `use` and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
const useSpendByCategoryStore = defineStore('spendByCategory', {
  state: () => ({
    spendingByCategories: [] as SpendingTypePerMonth[],
  }),
  // other options...
  actions: {
    async getSpendingByCategory() {
      try {
        this.spendingByCategories = []
        const now = getDateNow()
        // console.log('now', now);
        const q = query(
          collection(db, "spending"), 
          where("year", "==", now.currYear),
          where("month", "==", now.currMonth),
        )
        const dateQuerySnapshot = await getDocs(q);
        if(!dateQuerySnapshot.empty) {
          dateQuerySnapshot.forEach((el) => {
            // console.log(el.id, el.data().name, el.data().type);
            // if belum ada di array buat { type: '', total: '' }
            const spendingType = this.spendingByCategories.find((spendingTypeEl) => {
              return spendingTypeEl.type == el.data().type
            })
            // console.log('hasil', spendingType);
            if (!spendingType) {
              const newSpendingType: SpendingTypePerMonth = {
                type: el.data().type as string,
                total: el.data().amount,
              }
              this.spendingByCategories.push(newSpendingType)
            } else {
              spendingType.total = Number(spendingType.total) + Number(el.data().amount)
            }
            // else tambah total
          })
        }
        // console.log(this.spendingByCategories);
      } catch (error) {
        // console.log(error);
      }
    }
  },
})

export default useSpendByCategoryStore