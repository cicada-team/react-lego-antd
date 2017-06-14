import React from 'react'
import PropTypes from 'prop-types'
import { DatePicker } from 'antd'
import moment from 'moment'
import { pick, zip } from '../util'
import {
  keep,
  createFormItem,
  SIZES,
  COMMON_INPUT_EVENT,
  COMMON_FORM_ITEM_STATE_TYPES,
  createFormItemDefaultState,
} from '../common'

export const getDefaultState = () => ({
  ...createFormItemDefaultState(),
  value: undefined,
  format: 'YYYY-MM-DD',
  showTime: false,
  showToday: false,
  size: SIZES[0],
  disabled: false,
  style: {},
  allowClear: true,
})

export const stateTypes = {
  ...COMMON_FORM_ITEM_STATE_TYPES,
  value: PropTypes.string,
  format: PropTypes.string,
  showTime: PropTypes.bool,
  showToday: PropTypes.bool,
  size: PropTypes.oneOf(SIZES),
  disabled: PropTypes.bool,
  style: PropTypes.object,
  allowClear: PropTypes.bool,
}

export const defaultListeners = {
  ...zip(COMMON_INPUT_EVENT, new Array(COMMON_INPUT_EVENT.length).fill(keep)),
  onChange(_, __, valueString) {
    return {
      value: valueString,
    }
  },
  onOpenChange: keep,
}

export const defaultIntercepters = {
  disabledTime: undefined,
  disabledDate: undefined,
  getCalendarContainer: undefined,
}

export function render({ state, listeners, intercepters: finalIntercepters }) {
  const inputProps = pick(state, ['format', 'size', 'disabled', 'showTime', 'showToday', 'style', 'allowClear'])
  const value = !state.value ? null : moment(state.value, state.format)

  return createFormItem(
    state,
    <DatePicker value={value} {...inputProps} {...listeners} {...finalIntercepters} />
  )
}
