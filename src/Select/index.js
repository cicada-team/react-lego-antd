import React from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'
import { pick } from '../util'
import {
  createFormItem,
  SIZES,
  noop,
  COMMON_FORM_ITEM_STATE_TYPES,
  createFormItemDefaultState,
} from '../common'

const { Option, OptGroup } = Select

const OPTION_FILTER_PROP = ['value', 'children']
const MODES = ['default', 'multiple', 'tags', 'combobox']

export const getDefaultState = () => ({
  ...createFormItemDefaultState(),
  options: [],
  mode: MODES[0],
  value: undefined,
  placeholder: '',
  disabled: false,
  size: SIZES[0],
  style: {},
  optionFilterProp: OPTION_FILTER_PROP[0],
  showSearch: false,
  allowClear: false,
  notFoundContent: 'Not Found',
  dropdownMatchSelectWidth: true,
  defaultActiveFirstOption: true,
})

export const stateTypes = {
  ...COMMON_FORM_ITEM_STATE_TYPES,
  options: PropTypes.array,
  mode: PropTypes.oneOf(MODES),
  value: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(SIZES),
  style: PropTypes.object,
  optionFilterProp: PropTypes.oneOf(OPTION_FILTER_PROP),
  showSearch: PropTypes.bool,
  allowClear: PropTypes.bool,
  notFoundContent: PropTypes.string,
  dropdownMatchSelectWidth: PropTypes.bool,
  defaultActiveFirstOption: PropTypes.bool,
}

export const defaultListeners = {
  onChange(_, value) {
    return {
      value,
    }
  },
  onBlur: noop,
  onSearch: noop,
  onSelect: noop,
  onDeselect: noop,
  onFocus: noop,
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

export const defaultIntercepters = {
  filterOption: undefined,
}

export function render({ state, listeners, intercepters: finalIntercepters }) {
  const selectProps = pick(state, ['optionFilterProp', 'showSearch', 'allowClear', 'disabled', 'value', 'placeholder', 'size', 'notFoundContent', 'dropdownMatchSelectWidth', 'defaultActiveFirstOption'])
  if (state.mode !== MODES[0]) {
    selectProps.mode = state.mode
  }
  const style = {
    width: '100%',
    ...state.style,
  }

  return (
    createFormItem(state, (
      <Select {...listeners} {...selectProps} style={style} {...finalIntercepters}>
        {state.options.map(renderOption)}
      </Select>)
    )
  )
}
