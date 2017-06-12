import React from 'react'
import PropTypes from 'prop-types'
import { Row } from 'antd'
import { omit } from '../util'

const ALIGN = ['top', 'middle', 'bottom']
const JUSTIFY = ['start', 'end', 'center', 'space-around', 'space-between']
const OVERFLOWS = ['inherit', 'visible', 'hidden', 'scroll', 'auto']

/*
 state
 */
export const defaultState = {
  gutter: 0,
  type: undefined,
  align: ALIGN[0],
  justify: JUSTIFY[0],
  margin: '',
  style: {},
  overflowX: OVERFLOWS[0],
  overflowY: OVERFLOWS[0],
}
export const stateTypes = {
  gutter: PropTypes.number,
  type: PropTypes.string,
  align: PropTypes.oneOf(ALIGN),
  justify: PropTypes.oneOf(JUSTIFY),
  margin: PropTypes.string,
  style: PropTypes.object,
  overflowX: PropTypes.oneOf(OVERFLOWS),
  overflowY: PropTypes.oneOf(OVERFLOWS),
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
  const style = {}
  style.overflowX = state.overflowX
  style.overflowY = state.overflowY
  if (state.margin !== 0) {
    style.margin = state.margin
  }
  return (
    <div style={{ ...state.style, ...style }} {...listeners} >
      <Row {...omit(state, ['margin', 'style', 'overflow', 'overflowX', 'overflowY'])}>{children}</Row>
    </div>
  )
}
