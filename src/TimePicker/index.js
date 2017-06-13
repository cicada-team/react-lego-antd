import React from 'react'
import PropTypes from 'prop-types'
import { TimePicker } from 'antd'
import moment from 'moment'
import { pick, zip, compose } from '../util'
import { Children } from '../lego'
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
  placeholder: '',
  size: SIZES[0],
  disabled: false,
  style: {},
  hideDisabledOptions: true,
})

export const stateTypes = {
  ...COMMON_FORM_ITEM_STATE_TYPES,
  size: PropTypes.oneOf(SIZES),
  disabled: PropTypes.bool,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  style: PropTypes.object,
  hideDisabledOptions: PropTypes.bool,
}

export const defaultListeners = {
  ...zip(COMMON_INPUT_EVENT, new Array(COMMON_INPUT_EVENT.length).fill(keep)),
  onChange(_, __, dateString) {
    return {
      value: dateString,
    }
  },
}

export const identifiers = {
  Prefix: {},
  Suffix: {},
}

export const defaultIntercepters = {
  disabledHours: undefined,
  disabledMinutes: undefined,
  disabledSeconds: undefined,
}

export function render({ state, listeners, children, intercepters: finalIntercepters }) {
  const prefix = compose(Children.find, Children.hasChildren)(children, identifiers.Prefix) ? (
    Children.findChildren(children, identifiers.Prefix)[0]
  ) : null
  const suffix = compose(Children.find, Children.hasChildren)(children, identifiers.Suffix) ? (
    Children.findChildren(children, identifiers.Suffix)[0]
  ) : null
  const inputProps = pick(state, ['format', 'disabled', 'size', 'placeholder', 'style', 'hideDisabledOptions'])
  const value = !state.value ? null : moment(state.value, state.format)

  return createFormItem(
    state,
    <TimePicker value={value} {...inputProps} addonBefore={prefix} addonAfter={suffix} {...listeners} {...finalIntercepters} />
  )
}
