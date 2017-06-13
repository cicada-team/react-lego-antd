import React from 'react'
import PropTypes from 'prop-types'
import { DatePicker } from 'antd'
import moment from 'moment'
import { pick, zip } from '../util'
import {
  keep,
  createFormItem,
  SIZES,
  COMMON_FORM_ITEM_STATE_TYPES,
  createFormItemDefaultState,
  COMMON_INPUT_EVENT,
} from '../common'

const { RangePicker: DateRange } = DatePicker

/*
 props
 */
export const getDefaultState = () => ({
  ...createFormItemDefaultState(),
  startValue: '',
  endValue: '',
  format: 'YYYY-MM-DD HH:mm:ss',
  ranges: undefined,
  showTime: false,
  size: SIZES[0],
  disabled: false,
  style: {},
})

export const stateTypes = {
  ...COMMON_FORM_ITEM_STATE_TYPES,
  startValue: PropTypes.string,
  endValue: PropTypes.string,
  format: PropTypes.string,
  ranges: PropTypes.object,
  showTime: PropTypes.bool,
  size: PropTypes.oneOf(SIZES),
  disabled: PropTypes.bool,
  style: PropTypes.object,
}

/*
 reduce functions
 */
export const defaultListeners = {
  ...zip(COMMON_INPUT_EVENT, new Array(COMMON_INPUT_EVENT.length).fill(keep)),
  onChange(_, __, [startValue, endValue]) {
    return {
      startValue,
      endValue,
    }
  },
}

export const defaultIntercepters = {
  disabledTime: undefined,
  disabledDate: undefined,
  getCalendarContainer: undefined,
}

/*
 render
 */
export function render({ state, listeners, intercepters: finalIntercepters }) {
  const inputProps = pick(state, ['format', 'size', 'disabled', 'showTime', 'style', 'ranges'])
  const startValue = state.startValue === '' ? null : moment(state.startValue, state.format)
  const endValue = state.endValue === '' ? null : moment(state.endValue, state.format)

  return createFormItem(
    state,
    <DateRange value={[startValue, endValue]} {...inputProps} {...listeners} {...finalIntercepters} />
  )
}
