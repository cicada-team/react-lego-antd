import React from 'react'
import PropTypes from 'prop-types'
import { Switch } from 'antd'
import {
  SIZES,
} from '../common'

export const getDefaultState = () => ({
  disabled: false,
  checked: false,
  size: SIZES[0],
  checkedChildren: undefined,
  unCheckedChildren: undefined,
})

export const stateTypes = {
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  size: PropTypes.oneOf(SIZES),
  checkedChildren: PropTypes.string,
  unCheckedChildren: PropTypes.string,
}

export const defaultListeners = {
  onChange(_, checked) {
    return {
      checked,
    }
  },
}

export function render({ state, listeners }) {
  return <Switch {...state} {...listeners} />
}
