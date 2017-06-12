import React from 'react'
import PropTypes from 'prop-types'
import { Cascader } from 'antd'
import { pick } from '../util'
import {
  createFormItem,
  SIZES,
  COMMON_FORM_ITEM_STATE_TYPES,
  createFormItemDefaultState,
} from '../common'

const EXPAND_TRIGGER = ['click', 'hover']

/*
 props
 */
export const defaultState = {
  ...createFormItemDefaultState(),
  options: [],
  value: [],
  allowClear: true,
  expandTrigger: EXPAND_TRIGGER[0],
  changeOnSelect: false,
  showSearch: true,
  notFoundContent: '没有找到',
  placeholder: '',
  size: SIZES[0],
  disabled: false,
}

export const stateTypes = {
  ...COMMON_FORM_ITEM_STATE_TYPES,
  options: PropTypes.array,
  value: PropTypes.array,
  allowClear: PropTypes.bool,
  expandTrigger: PropTypes.oneOf(EXPAND_TRIGGER),
  changeOnSelect: PropTypes.bool,
  showSearch: PropTypes.bool,
  notFoundContent: PropTypes.string,
  size: PropTypes.oneOf(SIZES),
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
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

export const interceptors = ['loadData', 'displayRender']

/*
 render
 */
export function render({ state, listeners, interceptors: finalInterceptors }) {
  const inputProps = pick(state, ['size', 'style', 'value', 'options', 'allowClear', 'expandTrigger', 'placeholder', 'changeOnSelect', 'showSearch', 'notFoundContent'])
  return createFormItem(
    state,
    <Cascader {...inputProps} {...listeners} {...finalInterceptors} />
  )
}
