import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import { SIZES } from '../common'

/*
 state
 */
export const defaultState = {
  size: SIZES[0],
}

export const stateTypes = {
  size: PropTypes.oneOf(SIZES),
}

/*
 render
 */
export function render({ state, children }) {
  return <Button.Group size={state.size}>{children}</Button.Group>
}
