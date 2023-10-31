export function formatLongDateString(dateStr) {

  const originalDate = new Date(dateStr)

  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  const formattedDate = originalDate.toLocaleDateString('en-US', options)

  return formattedDate
}

export function formatPublishedDate(dateStr) {
  // '2016-01-05' into Jan 5 2016 
  let dateObj = new Date(dateStr)
  const monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun",
    "Jul", "Aug", "Sep",
    "Oct", "Nov", "Dec"
  ]

  const month = monthNames[dateObj.getMonth()];
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();

  return month + ' ' + day + ' ' + year
}

console.log("format '2016-01-05'", formatPublishedDate('2016-01-05'))
