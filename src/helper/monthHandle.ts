import { collection, getDocs, query, where, doc, addDoc, updateDoc } from "firebase/firestore";
import db from "@/firebase/index"

const addMonth = async (currMonth: number, amount: number, yearId: string) => {
  const q = query(
    collection(db, "month"), 
    where("monthNumber", "==", Number(currMonth)),
    where("yearId", "==", yearId)
  )
  const monthQuerySnapshot = await getDocs(q);
  let month = {
    monthId: '',
    month: currMonth
  }
  if (monthQuerySnapshot.empty) {
    console.log('month empty', currMonth);
    const newMonth = await addDoc(collection(db, 'month'), {
      monthNumber: currMonth,
      total: amount,
      yearId: yearId
    })
    month = {
      monthId: newMonth.id,
      month: currMonth
    }
  } else {
    let totalMonthSpending = 0
    monthQuerySnapshot.forEach((doc) => {
      month = {
        monthId: doc.id,
        month: doc.data().monthNumber
      }
      totalMonthSpending = doc.data().total;
    });
    console.log('update month total', month.monthId, totalMonthSpending);
    await updateDoc(doc(db, "month", month.monthId), {
      total: totalMonthSpending += Number(amount)
    })
  }
  return month
}

export const updateMonth = async (currMonth: number, newAmount: number, yearId: string, oldAmount: number) => {
  const q = query(
    collection(db, "month"), 
    where("monthNumber", "==", Number(currMonth)),
    where("yearId", "==", yearId)
  )
  const monthQuerySnapshot = await getDocs(q);
  let month = {
    monthId: '',
    month: currMonth
  }
  let totalMonthSpending = 0
  monthQuerySnapshot.forEach((doc) => {
    month = {
      monthId: doc.id,
      month: doc.data().monthNumber
    }
    totalMonthSpending = doc.data().total;
  });
  console.log('update month total', month.monthId, totalMonthSpending);
  await updateDoc(doc(db, "month", month.monthId), {
    total: (totalMonthSpending - Number(oldAmount)) + Number(newAmount)
  })
  return month
}

export default addMonth