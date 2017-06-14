import React from 'react'
import PropTypes from 'prop-types'
import { Tag } from 'antd'
import { omit } from '../util'

const colors = ['', 'blue', 'green', 'yellow', 'red', 'pink', 'orange', 'cyan', 'purple', 'blue-inverse', 'green-inverse', 'yellow-inverse', 'red-inverse', 'pink-inverse', 'orange-inverse', 'cyan-inverse', 'purple-inverse']

export const getDefaultState = () => ({
  closable: false,
  color: colors[0],
  text: '',
})

export const stateTypes = {
  closable: PropTypes.bool,
  color: PropTypes.oneOf(colors),
  text: PropTypes.string,
}

export const defaultListeners = {
  onClose() {},
  onClick() {},
  onMouseEnter() {},
  onMouseLeave() {},
}

export function render({ state, listeners }) {
  return (
    <Tag {...omit(state, 'text')} {...listeners}>
      {state.text}
    </Tag>
  )
}

export const display = 'inline'
