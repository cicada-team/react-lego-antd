import { noop, COMMON_INPUT_EVENT } from '../common'
import { zip } from '../util'

const computeValue = (type, state) => {
  const { step = 1 } = state
  let { value = 0 } = state
  switch (type) {
    case 'up':
      value += step
      break
    case 'down':
      value -= step
      break
    default:
      break
  }
  return value
}

const step = (type, state) => {
  if (state.disabled === true) return

  if (isNaN(state.value)) return

  const newValue = computeValue(type, state)
  if (
    (isFinite(state.max) && newValue > state.max) ||
    (isFinite(state.min) && newValue < state.min)
  ) {
    return
  }

  return {
    focused: true,
    value: newValue,
  }
}

function onDown({ state }, e) {
  e.preventDefault()
  return step('down', state)
}

function onUp({ state }, e) {
  e.preventDefault()
  return step('up', state)
}

function parseNumber(str) {
  if (str.trim() === '') return undefined

  return /\./.test(str) ? parseFloat(str) : parseInt(str, 10)
}

export default {
  ...zip(COMMON_INPUT_EVENT, new Array(COMMON_INPUT_EVENT.length).fill(noop)),
  onChange(_, e) {
    const newValue = parseNumber(e.target.value)
    return {
      value: isNaN(newValue) ? undefined : newValue,
    }
  },
  onEnter: noop,
  onDown,
  onUp,
}
