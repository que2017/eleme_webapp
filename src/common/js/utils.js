export function urlParse () {
  let url = window.location.search
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg)
  let obj = {}
  if (arr && arr.length) {
    arr.forEach((item) => {
      let hash = item.substring(1)
      let temp = hash.split('=')
      obj[temp[0]] = temp[1]
    })
  }
  return obj
}
