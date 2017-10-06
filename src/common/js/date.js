export function formatDate (ratings) {
  for (let i = 0; i < ratings.length; i++) {
    let item = ratings[i]
    let date = new Date(item.rateTime)
    let numDate = {
      year: date.getFullYear(),
      month: ('00' + (date.getMonth() + 1)).substring((date.getMonth() + 1).toString().length),
      date: ('00' + date.getDate()).substring(date.getDate().toString().length),
      hour: ('00' + date.getHours()).substring(date.getHours().toString().length),
      minute: ('00' + date.getMinutes()).substring(date.getMinutes().toString().length)
    }
    let strDate = numDate.year + '-' + numDate.month + '-' + numDate.date + ' ' + numDate.hour + ':' + numDate.minute
    item.time = strDate
  }
}
