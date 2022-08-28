import { defineStore } from 'pinia'

// You can name the return value of `defineStore()` anything you want, but it's best to use the name of the store and surround it with `use` and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    isPageReload: false
  }),
  // other options...
  actions: {
    setIsPageReload(payload: boolean) {
      this.isPageReload = payload
    }
  },
})

export default useDashboardStore