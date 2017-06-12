import React from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from 'antd'
import {
  createFormItem,
} from '../common'

const CheckboxGroup = Checkbox.Group

/*
 state
 */
export const defaultState = {
  items: [],
  disabled: false,
  value: [],
  label: '',
  help: '',
  required: true,
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
  hasFeedback: true,
  hasFormItemWrapper: true,
}

export const stateTypes = {
  items: PropTypes.array,
  disabled: PropTypes.bool,
  value: PropTypes.array,
  label: PropTypes.string,
  help: PropTypes.string,
  required: PropTypes.bool,
  labelCol: PropTypes.object,
  wrapperCol: PropTypes.object,
  hasFeedback: PropTypes.bool,
  hasFormItemWrapper: PropTypes.bool,
}

/*
 reduce functions
 */
export const defaultListeners = {
  onChange({ state }, value) {
    return {
      ...state,
      value,
    }
  },
}

/*
 render
 */
export function render({ state, listeners }) {
  return createFormItem(
    state,
    <CheckboxGroup options={state.items} value={state.value} onChange={listeners.onChange} />
  )
}
