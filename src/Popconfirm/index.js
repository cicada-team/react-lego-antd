import React from 'react'
import PropTypes from 'prop-types'
import { Popconfirm } from 'antd'

export const PLACEMENTS = ['top', 'left', 'right', 'bottom']

/*
 state
 */
export const defaultState = {
  placement: PLACEMENTS[0],
  title: '',
  okText: '确定',
  cancelText: '取消',
}
export const stateTypes = {
  placement: PropTypes.oneOf(PLACEMENTS),
  title: PropTypes.string,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
}

/*
 reduce functions
 */
export const defaultListeners = {
  onConfirm({ state }) {
    return {
      ...state,
    }
  },
  onCancel({ state }) {
    return {
      ...state,
    }
  },
  onVisibleChange({ state }) {
    return {
      ...state,
    }
  },
}

/*
 render
 */
export function render({ state, listeners, children }) {
  return (
    <Popconfirm {...state} {...listeners}>
      {children}
    </Popconfirm>
  )
}
