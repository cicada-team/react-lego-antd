import React from 'react'
import PropTypes from 'prop-types'
import { AutoComplete } from 'antd'
import { pick, zip } from '../util'
import {
  noop,
  createFormItem,
  SIZES,
  COMMON_INPUT_EVENT,
  COMMON_FORM_ITEM_STATE_TYPES,
  createFormItemDefaultState,
} from '../common'
/*
 props
 */
export const getDefaultState = () => ({
  ...createFormItemDefaultState(),
  value: '',
  options: [],
  placeholder: '',
  allowClear: false,
  size: SIZES[0],
  disabled: false,
})

export const stateTypes = {
  ...COMMON_FORM_ITEM_STATE_TYPES,
  value: PropTypes.string,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  allowClear: PropTypes.bool,
  size: PropTypes.oneOf(SIZES),
  disabled: PropTypes.bool,
}

/*
 reduce functions
 */
export const defaultListeners = {
  ...zip(COMMON_INPUT_EVENT, new Array(COMMON_INPUT_EVENT.length).fill(noop)),
  onChange({ state }, value) {
    return {
      ...state,
      value,
    }
  },
  onSelect({ state }, value) {
    return {
      ...state,
      value,
    }
  },
}

export const defaultIntercepters = { filterOption: () => true }

/*
 render
 */
export function render({ state, listeners, intercepters: finalIntercepters }) {
  const inputProps = pick(state, ['disabled', 'size', 'placeholder', 'value'])
  const { options: dataSource } = state

  const style = { width: '100%' }

  return createFormItem(
    state,
    <AutoComplete
      {...finalIntercepters}
      {...inputProps}
      dataSource={dataSource}
      style={style}
      {...listeners}
    />
  )
}
