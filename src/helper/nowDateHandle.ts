const getDateNow = () => {
  const currYear = new Date().getFullYear()
  const currMonth = new Date().getMonth() + 1
  const currDay = new Date().getDate()
  return { currYear, currMonth, currDay }
}

export default getDateNow