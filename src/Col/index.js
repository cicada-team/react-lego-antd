import React from 'react'
import PropTypes from 'prop-types'
import { Col } from 'antd'
import { omit } from '../util'

const ALIGN = ['left', 'middle', 'right']
const alignToJustify = {
  middle: 'center',
  right: 'flex-end',
}

const OVERFLOWS = ['inherit', 'visible', 'hidden', 'scroll', 'auto']

/*
 state
 */
export const defaultState = {
  span: 8,
  order: 0,
  offset: 0,
  push: 0,
  pull: 0,
  padding: '',
  style: {},
  align: ALIGN[0],
  overflowX: OVERFLOWS[0],
  overflowY: OVERFLOWS[0],
}
export const stateTypes = {
  span: PropTypes.number,
  order: PropTypes.number,
  offset: PropTypes.number,
  push: PropTypes.number,
  pull: PropTypes.number,
  padding: PropTypes.string,
  style: PropTypes.object,
  align: PropTypes.oneOf(ALIGN),
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
  if (state.padding !== undefined && state.padding.trim() !== '') {
    style.padding = state.padding
  }
  if (state.align !== ALIGN[0]) {
    style.display = 'flex'
    style.justifyContent = alignToJustify[state.align]
  }
  return (
    <Col {...omit(state, ['padding', 'align', 'style', 'overflowX', 'overflowY'])}>
      <div {...listeners} style={{ ...state.style, ...style }}>
        <div>{children}</div>
      </div>
    </Col>
  )
}
