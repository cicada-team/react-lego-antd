import React from 'react'
import PropTypes from 'prop-types'
import { pick, filter } from '../util'

const prefixClass = 'cicada'
const DEFAULT = 'default'
const ALIGN_SELF = ['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch']
const OVERFLOWS = ['visible', 'inherit', 'hidden', 'scroll', 'auto']
const SPACING = ['default', 'large', 'none']

/*
 state
 */
export const defaultState = {
  spacing: DEFAULT,
  flex: '',
  width: '',
  height: '',
  overflowX: OVERFLOWS[0],
  overflowY: OVERFLOWS[0],
  alignSelf: ALIGN_SELF[0],
  inline: true,
  margin: '',
  padding: '',
  style: {},
}
export const stateTypes = {
  spacing: PropTypes.oneOf(SPACING),
  flex: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  overflowX: PropTypes.oneOf(OVERFLOWS),
  overflowY: PropTypes.oneOf(OVERFLOWS),
  alignSelf: PropTypes.oneOf(ALIGN_SELF),
  inline: PropTypes.bool,
  margin: PropTypes.string,
  padding: PropTypes.string,
  style: PropTypes.object,
}

/*
 reduce functions
 */
export const defaultListeners = {
  onClick({ state }) {
    return state
  },
}

/*
 render
 */
export function render({ state, children, listeners }) {
  const style = filter(pick(state, ['flex', 'width', 'height', 'alignSelf', 'overflowX', 'overflowY', 'margin', 'padding']), val => !!val)
  style.display = state.inline ? 'inline-block' : 'block'

  return (
    <div style={{ ...style, ...state.style }} {...listeners} className={`${prefixClass}-block-item-margin-${state.spacing}`}>
      {children}
    </div>
  )
}
