import getDateNow from '@/helper/nowDateHandle'
import { defineStore } from 'pinia'
import { collection, getDocs, query, where } from "firebase/firestore";
import db from "@/firebase/index"
import { DailySpent } from '@/type/dailySpent';
import { SpendingItem } from '@/type/SpendingItems';
import _ from "lodash"

// You can name the return value of `defineStore()` anything you want, but it's best to use the name of the store and surround it with `use` and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
const useDailtSpentPerMonthStore = defineStore('dailySpentPerMonth', {
  state: () => ({
    dailySpentArr: [] as DailySpent[],
    month: '',
  }),
  // other options...
  actions: {
    async getDailySpent() {
      try {
        this.dailySpentArr = []
        const now = getDateNow()
        this.month = now.currMonthName
        // console.log('now', now);
        const q = query(
          collection(db, "spending"), 
          where("year", "==", now.currYear),
          where("month", "==", now.currMonth),
        )
        const dateQuerySnapshot = await getDocs(q);
        if(!dateQuerySnapshot.empty) {
          dateQuerySnapshot.forEach((el) => {
            // console.log('🙈', el.id, el.data().name, el.data().type, el.data().date);
            const spendingDay = this.dailySpentArr.find((day) => {
              return day.date == el.data().date
            })
            console.log('hasil', spendingDay)
            if (!spendingDay) {
              const newSpendingType: DailySpent = {
                date: el.data().date,
                total: el.data().amount,
                SpendingItems: []
              }
              const spendingItem: SpendingItem = {
                id: el.id,
                amount: el.data().amount,
                createdAt: el.data().createdAt,
                name: el.data().name,
                type: el.data().type
              }
              newSpendingType.SpendingItems.push(spendingItem)
              this.dailySpentArr.push(newSpendingType)
            } else {
              spendingDay.total = Number(spendingDay.total) + Number(el.data().amount)
              const spendingItem: SpendingItem = {
                id: el.id,
                amount: el.data().amount,
                createdAt: el.data().createdAt,
                name: el.data().name,
                type: el.data().type
              }
              spendingDay.SpendingItems.push(spendingItem)
            }
          })
        }
        // console.log(this.dailySpentArr);
        this.dailySpentArr = _.orderBy(this.dailySpentArr, ['date'], ['desc']);
      } catch (error) {
        // console.log(error);
      }
    }
  },
})

export default useDailtSpentPerMonthStore