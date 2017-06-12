import React from 'react'
import PropTypes from 'prop-types'
import { omit } from '../util'

const prefixClass = 'cicada'
const DEFAULT = 'DEFAULT'

const FONT_SIZES = {
  DEFAULT: 12,
  NORMAL: 14,
  LARGE: 16,
}

const DEFAULT_LINE_HEIGHT = 1.5

/*
 props
 */
export const defaultState = {
  title: false,
  text: '',
  color: '',
  backgroundColor: '',
  lineHeight: DEFAULT_LINE_HEIGHT,
  fontSize: DEFAULT,
  style: {},
}
export const stateTypes = {
  title: PropTypes.bool,
  text: PropTypes.string,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  lineHeight: PropTypes.number,
  fontSize: PropTypes.oneOf(Object.keys(FONT_SIZES)),
  style: PropTypes.object,
}
/*
 reduce functions
 */
export const defaultListeners = {
  onClick({ state }) {
    return {
      ...state,
    }
  },
}
/*
 render
 */
export function render({ state, listeners }) {
  const style = omit(state, ['title', 'text', 'fontSize'])
  style.fontSize = FONT_SIZES[state.fontSize]
  if (state.title === true) {
    style.fontWeight = 'bold'
  }
  return <span style={{ ...style, ...state.style }} {...listeners} className={`${prefixClass}-label`} >{state.text}</span>
}
