import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import { omit } from '../util'
import { keep, SIZES } from '../common'

const TYPES = ['normal', 'primary', 'dashed', 'ghost']
const SHAPES = ['default', 'circle']

/*
 props
 */
export const defaultState = {
  text: undefined,
  size: SIZES[0],
  loading: false,
  type: TYPES[0],
  disabled: false,
  icon: '',
  shape: SHAPES[0],
}

export const stateTypes = {
  text: PropTypes.string,
  size: PropTypes.oneOf(SIZES),
  loading: PropTypes.bool,
  type: PropTypes.oneOf(TYPES),
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  shape: PropTypes.oneOf(SHAPES),
}

/*
 reduce functions
 */
export const defaultListeners = {
  onClick: keep,
}

/*
 render
 */
export function render({ state, listeners }) {
  const props = omit(state, ['text', 'shape'])
  if (state.shape !== SHAPES[0]) {
    props.shape = state.shape
  }

  return <Button {...props} {...listeners}>{state.text}</Button>
}
