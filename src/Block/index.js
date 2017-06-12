import React from 'react'
import PropTypes from 'prop-types'
import { Row } from 'antd'
import { omit, pick, filter } from '../util'

const prefixClass = 'cicada'
const DEFAULT = 'default'
const OVERFLOW_PROPS = ['overflowX', 'overflowY']
const ALIGN = ['top', 'middle', 'bottom']
const JUSTIFY = ['start', 'end', 'center', 'space-around', 'space-between']
const OVERFLOWS = ['visible', 'inherit', 'hidden', 'scroll', 'auto']
const FLEX_WRAP = ['nowrap', 'wrap']
const SPACING = {
  default: 16,
  small: 8,
  large: 24,
  none: 0,
}

/*
 state
 */
export const defaultState = {
  align: ALIGN[0],
  justify: JUSTIFY[0],
  overflowX: OVERFLOWS[0],
  overflowY: OVERFLOWS[0],
  flexWrap: FLEX_WRAP[0],
  margin: '',
  padding: '',
  spacing: DEFAULT,
  style: {},
}

export const stateTypes = {
  align: PropTypes.oneOf(ALIGN),
  justify: PropTypes.oneOf(JUSTIFY),
  overflowX: PropTypes.oneOf(OVERFLOWS),
  overflowY: PropTypes.oneOf(OVERFLOWS),
  flexWrap: PropTypes.oneOf(FLEX_WRAP),
  margin: PropTypes.string,
  padding: PropTypes.string,
  spacing: PropTypes.oneOf(Object.keys(SPACING)),
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
  const wrapperStyle = filter(pick(state, [...OVERFLOW_PROPS, 'margin', 'padding']), val => !!val)
  if (state.margin === '') {
    wrapperStyle.marginBottom = SPACING[state.spacing]
  }

  const flexStyle = {
    type: 'flex',
  }

  const style = pick(state, ['flexWrap'])
  const props = omit({ ...state, ...flexStyle }, [...OVERFLOW_PROPS, 'spacing', 'margin', 'padding', 'flexWrap'])

  return (
    <div style={style} {...listeners} className={`${prefixClass}-block`}>
      <Row {...props} style={{ ...style, ...state.style }}>{children}</Row>
    </div>
  )
}
