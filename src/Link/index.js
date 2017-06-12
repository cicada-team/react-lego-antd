import React from 'react'
import PropTypes from 'prop-types'
import { omit, pick } from '../util'

/* eslint-disable */
const defaultHref = 'javascript:void(0)'
const prefixCls = 'cicada-link'
const DEFAULT = 'DEFAULT'
const FONT_SIZES = {
  DEFAULT: 12,
  NORMAL: 14,
  LARGE: 16,
}

const DEFAULT_LINE_HEIGHT = 1

/*
 props
 */
export const defaultState = {
  text: '',
  href: '',
  padding: '0',
  target: '_self',
  color: '#108ee9',
  fontSize: DEFAULT,
  lineHeight: DEFAULT_LINE_HEIGHT,
}
export const stateTypes = {
  text: PropTypes.string,
  href: PropTypes.string,
  target: PropTypes.string,
  padding: PropTypes.string,
  color: PropTypes.string,
  fontSize: PropTypes.oneOf(Object.keys(FONT_SIZES)),
  lineHeight: PropTypes.number,
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
  const style = pick(state, ['color', 'fontSize', 'lineHeight'])
  style.fontSize = FONT_SIZES[state.fontSize]
  if (state.padding !== undefined && state.padding.trim() !== '') {
    style.padding = state.padding
  }
  const href = state.href || defaultHref
  return <a href={href} className={prefixCls} style={style} {...omit(state, ['padding', 'color', 'text', 'href', 'lineHeight'])} {...listeners}>{state.text}</a>
}
