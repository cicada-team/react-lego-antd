import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'antd'
import { pick, zip, compose, omit } from '../util'
import { Children } from '../lego'
import {
  noop,
  createFormItem,
  SIZES,
  COMMON_INPUT_EVENT,
  COMMON_FORM_ITEM_STATE_TYPES,
  createFormItemDefaultState,
} from '../common'

const Search = Input.Search

/*
 props
 */
export const getDefaultState = () => ({
  ...createFormItemDefaultState(),
  value: '',
  placeholder: '',
  size: SIZES[0],
  disabled: false,
  readOnly: false,
  search: false,
})

export const stateTypes = {
  ...COMMON_FORM_ITEM_STATE_TYPES,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(SIZES),
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  search: PropTypes.bool,
}

/*
 reduce functions
 */
export const defaultListeners = {
  ...zip(COMMON_INPUT_EVENT, new Array(COMMON_INPUT_EVENT.length).fill(noop)),
  onChange(_, e) {
    return {
      value: e.target.value,
    }
  },
  onPressEnter: noop,
  onSearch: noop,
}


/*
 identifier
 */
export const identifiers = {
  Prefix: {},
  Suffix: {},
}

/*
 render
 */
export function render({ state, listeners, children }) {
  const prefix = compose(Children.find, Children.hasChildren)(children, identifiers.Prefix) ? (
    Children.findChildren(children, identifiers.Prefix)[0]
  ) : null

  const suffix = compose(Children.find, Children.hasChildren)(children, identifiers.Suffix) ? (
    Children.findChildren(children, identifiers.Suffix)[0]
  ) : null

  const inputProps = pick(state, ['value', 'disabled', 'size', 'placeholder', 'readOnly'])
  const Component = state.search === true ? Search : Input
  const finalListeners = state.search === true ? listeners : omit(listeners, ['onSearch'])

  const style = {
    width: '100%',
  }

  return createFormItem(
    state,
    <Component style={style} {...inputProps} addonBefore={prefix} addonAfter={suffix} {...finalListeners} />
  )
}
