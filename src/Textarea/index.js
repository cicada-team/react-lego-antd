import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'antd'
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
  value: '',
  placeholder: '',
  size: SIZES[0],
  disabled: false,
  label: '',
  help: '',
  extra: '',
  minRows: 2,
  maxRows: 6,
  readOnly: false,
})

export const stateTypes = {
  ...COMMON_FORM_ITEM_STATE_TYPES,
  size: PropTypes.oneOf(SIZES),
  disabled: PropTypes.bool,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  help: PropTypes.string,
  extra: PropTypes.string,
  minRows: PropTypes.number,
  maxRows: PropTypes.number,
  readOnly: PropTypes.bool,
}

export const defaultListeners = {
  ...zip(COMMON_INPUT_EVENT, new Array(COMMON_INPUT_EVENT.length).fill(keep)),
  onChange(_, e) {
    return {
      value: e.target.value,
    }
  },
  onPressEnter: keep,
}

export function render({ state, listeners }) {
  const inputProps = pick(state, ['value', 'disabled', 'size', 'placeholder', 'readOnly'])
  const autosize = {
    minRows: state.minRows,
    maxRows: state.maxRows,
  }

  return createFormItem(
    state,
    <Input type="textarea" autosize={autosize} {...inputProps} {...listeners} />
  )
}
