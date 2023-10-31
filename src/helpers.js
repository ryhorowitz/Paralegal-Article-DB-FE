export function formatDate(dateStr) {

  const originalDate = new Date(dateStr)

  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  const formattedDate = originalDate.toLocaleDateString('en-US', options)

  return formattedDate

}


// console.log('formatDate', formatDate("2023-10-25T17:30:01.555Z"))
