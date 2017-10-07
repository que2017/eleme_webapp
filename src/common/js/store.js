export function saveToLocation (id, key, val) {
  var seller = window.localStorage.__seller__
  // console.log(seller)
  if (!seller) {
    seller = {}
    seller[id] = {}
  } else {
    seller = JSON.parse(seller)
    if (!seller[id]) {
      seller[id] = {}
    }
  }
  seller[id][key] = val
  window.localStorage.__seller__ = JSON.stringify(seller)
}

export function loadLocaltionVal (id, key, defaultValue) {
  var seller = JSON.parse(window.localStorage.__seller__)
  if (seller[id] !== undefined && seller[id][key] !== undefined) {
    return seller[id][key]
  } else {
    return defaultValue
  }
}
