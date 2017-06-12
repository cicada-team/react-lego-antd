import React from 'react'
import PropTypes from 'prop-types'
import { Spin } from 'antd'
import {
  SIZES,
} from '../common'

/*
 state
 */
export const defaultState = {
  spinning: false,
  size: SIZES[0],
  tip: '',
  delay: undefined,
}

export const stateTypes = {
  spinning: PropTypes.bool,
  size: PropTypes.oneOf(SIZES),
  tip: PropTypes.string,
  delay: PropTypes.number,
}

/*
 render
 */
export function render({ state, children }) {
  return <Spin {...state} >{children}</Spin>
}
