import React from 'react'
import PropTypes from 'prop-types'
import { Radio } from 'antd'
import {
  createFormItem,
  createFormItemDefaultState,
  COMMON_FORM_ITEM_STATE_TYPES,
} from '../common'

const Group = Radio.Group
const Button = Radio.Button

const TYPES = ['default', 'button']
const SIZES = ['default', 'small', 'large']

/*
 state
 */
export const defaultState = {
  ...createFormItemDefaultState(),
  items: [],
  disabled: false,
  value: undefined,
  size: SIZES[0],
  type: TYPES[0],
}

export const stateTypes = {
  ...COMMON_FORM_ITEM_STATE_TYPES,
  items: PropTypes.array,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  size: PropTypes.oneOf(SIZES),
  type: PropTypes.oneOf(TYPES),
}

/*
 reduce functions
 */
export const defaultListeners = {
  onChange({ state }, e) {
    return {
      ...state,
      value: e.target.value,
    }
  },
}

/*
 render
 */
export function render({ state, listeners }) {
  const groupDisable = state.disabled
  const Component = state.type === TYPES[1] ? Button : Radio

  return createFormItem(
    state,
    <Group onChange={listeners.onChange} value={state.value} size={state.size}>
      {state.items.map(({ key, value, disabled = groupDisable || false, text }, index) => (
        <Component key={key || index} value={value} disabled={disabled}>{text}</Component>
      ))}
    </Group>
  )
}
