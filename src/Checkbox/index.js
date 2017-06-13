import React from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from 'antd'
import { omit } from '../util'

export const getDefaultState = () => ({
  text: '',
  disabled: false,
  checked: false,
  indeterminate: false,
})

export const stateTypes = {
  text: PropTypes.string,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  indeterminate: PropTypes.bool,
}

export const defaultListeners = {
  onChange(_, e) {
    return {
      checked: e.target.checked,
    }
  },
}

export function render({ state, listeners }) {
  console.log(state)
  return <Checkbox {...omit(state, 'text')} {...listeners}>{state.text}</Checkbox>
}

export const display = 'inline'
