import { collection, getDocs, query, where, doc, addDoc, updateDoc } from "firebase/firestore";
import db from "@/firebase/index"

const addYear = async (currYear: number, amount: number) => {
  const q = query(collection(db, "year"), where("year", "==", Number(currYear)))
  const yearQuerySnapshot = await getDocs(q);
  let year = {
    yearId: '',
    year: currYear
  }
  if (yearQuerySnapshot.empty) {
    console.log('year empty', currYear);
    const newYear = await addDoc(collection(db, 'year'), {
      year: currYear,
      total: amount
    })
    year = {
      yearId: newYear.id,
      year: currYear
    }
  } else {
    let totalYearSpending = 0
    yearQuerySnapshot.forEach((doc) => {
      year = {
        yearId: doc.id,
        year: doc.data().year
      }
      totalYearSpending = doc.data().total;
    });
    console.log('update year total', year.yearId, totalYearSpending);
    await updateDoc(doc(db, "year", year.yearId), {
      total: totalYearSpending += Number(amount)
    })
  }
  return year
}

export const updateAmountYear = async (currYear: number, newAmount: number, oldAmount: number) => {
  const q = query(collection(db, "year"), where("year", "==", Number(currYear)))
  const yearQuerySnapshot = await getDocs(q);
  let year = {
    yearId: '',
    year: currYear
  }
  let totalYearSpending = 0
  yearQuerySnapshot.forEach((doc) => {
    year = {
      yearId: doc.id,
      year: doc.data().year
    }
    totalYearSpending = doc.data().total;
  });
  console.log('update year total', year.yearId, totalYearSpending);
  await updateDoc(doc(db, "year", year.yearId), {
    total: (totalYearSpending - Number(oldAmount)) + Number(newAmount)
  })
  return year
}

export const reduceAmountYear = async (currYear: number, newAmount: number) => {
  const q = query(collection(db, "year"), where("year", "==", Number(currYear)))
  const yearQuerySnapshot = await getDocs(q);
  let year = {
    yearId: '',
    year: currYear
  }
  let totalYearSpending = 0
  yearQuerySnapshot.forEach((doc) => {
    year = {
      yearId: doc.id,
      year: doc.data().year
    }
    totalYearSpending = doc.data().total;
  });
  console.log('update year total', year.yearId, totalYearSpending);
  await updateDoc(doc(db, "year", year.yearId), {
    total: totalYearSpending - Number(newAmount)
  })
  return year
}
export default addYear