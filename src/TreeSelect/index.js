import React from 'react'
import PropTypes from 'prop-types'
import { TreeSelect } from 'antd'
import { pick, zip } from '../util'
import {
  noop,
  createFormItem,
  SIZES,
  COMMON_INPUT_EVENT,
  COMMON_FORM_ITEM_STATE_TYPES,
  createFormItemDefaultState,
} from '../common'

export const getDefaultState = () => ({
  ...createFormItemDefaultState(),
  value: undefined,
  labelInValue: false,
  multiple: false,
  placeholder: '',
  showSearch: false,
  treeCheckable: false,
  treeDefaultExpandAll: false,
  treeData: [],
  size: SIZES[0],
  disabled: false,
})

export const stateTypes = {
  ...COMMON_FORM_ITEM_STATE_TYPES,
  value: PropTypes.string,
  labelInValue: PropTypes.bool,
  multiple: PropTypes.bool,
  showSearch: PropTypes.bool,
  treeCheckable: PropTypes.bool,
  treeDefaultExpandAll: PropTypes.bool,
  treeData: PropTypes.array,
  size: PropTypes.oneOf(SIZES),
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
}

export const defaultListeners = {
  ...zip(COMMON_INPUT_EVENT, new Array(COMMON_INPUT_EVENT.length).fill(noop)),
  onSelect: noop,
  onChange(_, value) {
    return {
      value,
    }
  },
}


/*
 render
 */
export function render({ state, listeners }) {
  const inputProps = pick(state, ['value', 'labelInValue', 'multiple', 'placeholder', 'showSearch', 'treeCheckable', 'treeDefaultExpandAll', 'treeData'])
  return createFormItem(
    state,
    <TreeSelect style={{ width: 300 }} {...inputProps} {...listeners} />
  )
}
