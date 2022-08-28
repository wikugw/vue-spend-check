import { collection, getDocs, query, where, doc, addDoc, updateDoc } from "firebase/firestore";
import db from "@/firebase/index"

const addDate = async (currDate: number, amount: number, yearId: string, monthId: string) => {
  const q = query(
    collection(db, "date"), 
    where("date", "==", Number(currDate)),
    where("yearId", "==", yearId),
    where("monthId", "==", monthId),
  )
  const dateQuerySnapshot = await getDocs(q);
  let date = {
    dateId: '',
    date: currDate
  }
  if (dateQuerySnapshot.empty) {
    console.log('date empty', currDate);
    const newDate = await addDoc(collection(db, 'date'), {
      date: currDate,
      total: amount,
      yearId: yearId,
      monthId: monthId,
    })
    date = {
      dateId: newDate.id,
      date: currDate
    }
  } else {
    let totalDateSpending = 0
    dateQuerySnapshot.forEach((doc) => {
      date = {
        dateId: doc.id,
        date: doc.data().date
      }
      totalDateSpending = doc.data().total;
    });
    console.log('update date total', date.dateId, totalDateSpending);
    await updateDoc(doc(db, "date", date.dateId), {
      total: totalDateSpending += Number(amount)
    })
  }
  return date
}

export const updateDate = async (currDate: number, newAmount: number, yearId: string, monthId: string, oldAmount: number) => {
  const q = query(
    collection(db, "date"), 
    where("date", "==", Number(currDate)),
    where("yearId", "==", yearId),
    where("monthId", "==", monthId),
  )
  const dateQuerySnapshot = await getDocs(q);
  let date = {
    dateId: '',
    date: currDate
  }
  let totalDateSpending = 0
  dateQuerySnapshot.forEach((doc) => {
    date = {
      dateId: doc.id,
      date: doc.data().date
    }
    totalDateSpending = doc.data().total;
  });
  console.log('update date total', date.dateId, totalDateSpending);
  await updateDoc(doc(db, "date", date.dateId), {
    total: (totalDateSpending - Number(oldAmount)) + Number(newAmount)
  })
  return date
}

export const reduceAmountDate = async (currDate: number, newAmount: number, yearId: string, monthId: string) => {
  const q = query(
    collection(db, "date"), 
    where("date", "==", Number(currDate)),
    where("yearId", "==", yearId),
    where("monthId", "==", monthId),
  )
  const dateQuerySnapshot = await getDocs(q);
  let date = {
    dateId: '',
    date: currDate
  }
  let totalDateSpending = 0
  dateQuerySnapshot.forEach((doc) => {
    date = {
      dateId: doc.id,
      date: doc.data().date
    }
    totalDateSpending = doc.data().total;
  });
  console.log('update date total', date.dateId, totalDateSpending);
  await updateDoc(doc(db, "date", date.dateId), {
    total: totalDateSpending - Number(newAmount)
  })
  return date
}

export default addDate