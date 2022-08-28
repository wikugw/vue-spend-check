import { SpendingItem } from "./SpendingItems"

export type DailySpent = {
  date: number,
  total: number,
  SpendingItems: SpendingItem[]
}