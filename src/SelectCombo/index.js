import React from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'
import { pick } from '../util'
import {
  SIZES,
  createFormItem,
  noop,
  COMMON_FORM_ITEM_STATE_TYPES,
  createFormItemDefaultState,
} from '../common'

const { Option, OptGroup } = Select

const OPTION_FILTER_PROP = ['value', 'children']

/*
 state
 */
export const getDefaultState = () => ({
  ...createFormItemDefaultState(),
  options: [],
  value: [],
  disabled: false,
  placeholder: '',
  size: SIZES[0],
  optionFilterProp: OPTION_FILTER_PROP[0],
  showSearch: false,
  allowClear: false,
  notFoundContent: '没有找到',
  dropdownMatchSelectWidth: true,
  defaultActiveFirstOption: true,
})

export const stateTypes = {
  ...COMMON_FORM_ITEM_STATE_TYPES,
  options: PropTypes.array,
  value: PropTypes.array,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(SIZES),
  optionFilterProp: PropTypes.oneOf(OPTION_FILTER_PROP),
  showSearch: PropTypes.bool,
  allowClear: PropTypes.bool,
  notFoundContent: PropTypes.string,
  dropdownMatchSelectWidth: PropTypes.bool,
  defaultActiveFirstOption: PropTypes.bool,
}

/*
 reduce functions
 */
export const defaultListeners = {
  onChange(_, value) {
    return {
      value,
    }
  },
  onSearch: noop,
}


function renderOption(option, index) {
  if (option.type === 'group') {
    return (
      <OptGroup key={index} label={option.label}>
        {option.children.map(renderOption)}
      </OptGroup>
    )
  }

  return (
    <Option key={index} value={option.value} disabled={option.disabled || false}>
      {option.label}
    </Option>
  )
}

export const defaultInterceptors = { filterOption: undefined }

/*
 render
 */
export function render({ state, listeners, intercepters: finalIntercepters }) {
  const selectProps = pick(state, ['optionFilterProp', 'showSearch', 'allowClear', 'disabled', 'value', 'placeholder', 'size', 'notFoundContent', 'dropdownMatchSelectWidth', 'defaultActiveFirstOption'])
  return createFormItem(state, (
    <Select mode="multiple" {...listeners} {...selectProps} style={{ width: '100%' }} {...finalIntercepters}>
      {state.options.map(renderOption)}
    </Select>
  ))
}
