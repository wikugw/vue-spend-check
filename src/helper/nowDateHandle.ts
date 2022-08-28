import moment from "moment";

const getDateNow = () => {
  const currYear = new Date().getFullYear()
  const currMonth = new Date().getMonth() + 1
  const currDay = new Date().getDate()
  const currMonthName = moment.months(Number(new Date().getMonth)); 
  return { currYear, currMonth, currDay, currMonthName }
}

export default getDateNow