// TODO 要重写，目前没有效果
import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import { SIZES } from '../common'

export const getDefaultState = () => ({
  size: SIZES[0],
})

export const stateTypes = {
  size: PropTypes.oneOf(SIZES),
}

export function render({ state, children }) {
  return <Button.Group size={state.size}>{children}</Button.Group>
}
