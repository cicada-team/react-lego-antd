import React from 'react'
import PropTypes from 'prop-types'
import { Switch } from 'antd'
import {
  SIZES,
} from '../common'

/*
 state
 */
export const defaultState = {
  disabled: false,
  checked: false,
  size: SIZES[0],
  checkedChildren: undefined,
  unCheckedChildren: undefined,
}

export const stateTypes = {
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  size: PropTypes.oneOf(SIZES),
  checkedChildren: PropTypes.string,
  unCheckedChildren: PropTypes.string,
}

/*
 reduce functions
 */
export const defaultListeners = {
  onChange({ state }, checked) {
    return {
      ...state,
      checked,
    }
  },
}

/*
 render
 */
export function render({ state, listeners }) {
  return <Switch {...state} {...listeners} />
}
