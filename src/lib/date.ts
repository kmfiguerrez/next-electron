/**
 * Converts date string into Date-only form: YYYY-MM-DD
 * 
 * @param localeDateString - A Date string in the format: MM/DD/YYYY
 * 
 * @throws Throws an error if param is not in the specified date string format or invalid date.
 */
export const toDateOnlyForm = (localeDateString: string) => {
  const dateStringPattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/

  if (!dateStringPattern.test(localeDateString)) {
    // console.log("Input date must be in the format: MM/DD/YYYY")
    throw new Error("Invalid date string format")
  }
  
  if (new Date(localeDateString).toString() === "Invalid Date") {
    throw new Error("Invalid Date")
  }

  const groupPatterns = /(\d{1,2})\/(\d{1,2})\/(\d{4})/
  const matches = localeDateString.match(groupPatterns)
  
  if (!matches) throw new Error("Invalid Date")

  let month: string = matches[1]
  let day: string = matches[2]
  const year: string = matches[3]

  if (day.length === 1) day = day.padStart(2, "0")
  if (month.length === 1) month = month.padStart(2, "0")

  const dateOnlyForm: string = `${year}-${month}-${day}`

  return dateOnlyForm
}