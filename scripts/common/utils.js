const keys = Object.keys

function reduce(obj, handler, initial = {}) {
  return keys(obj).reduce((last, key) => handler(last, obj[key], key), initial)
}

function filter(obj, handler) {
  return reduce(obj, (last, item, key) => (handler(item, key) ? Object.assign(last, { [key]: item }) : last))
}

function omit(obj, names) {
  return filter(obj, (value, name) => names.indexOf(name) === -1)
}

function mapValues(obj, handler) {
  return reduce(obj, (last, value, key) => {
    last[key] = handler(value, key)
    return last
  })
}

function mapKeys(obj, handler) {
  return reduce(obj, (last, value, key) => {
    last[handler(value, key)] = value
    return last
  })
}

function map(obj, fn) {
  return Object.keys(obj).reduce((output, key, index) => output.concat(fn(obj[key], key, index)), [])
}

function each(obj, fn) {
  return keys(obj).forEach((k) => {
    fn(obj[k], k)
  })
}

function pick(obj, names) {
  return filter(obj, (value, name) => names.indexOf(name) !== -1)
}

module.exports = {
  map,
  each,
  mapValues,
  pick,
  mapKeys,
  omit,
}

