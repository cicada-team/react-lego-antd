import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd'
import { keep } from '../common'

export const SIZES = ['12', '14', '16', '18', '24', '32', '48', '64', '72']
/*
 state
 */
export const defaultState = {
  type: '',
  size: SIZES[0],
  color: '',
  spin: false,
}
export const stateTypes = {
  type: PropTypes.string,
  size: PropTypes.oneOf(SIZES),
  color: PropTypes.string,
  spin: PropTypes.bool,
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
  const style = {
    color: state.color,
  }

  return (
    <span onClick={listeners.onClick} >
      <Icon className={`ant-icon-${state.size}`} type={state.type} spin={state.spin} style={style} />
    </span>
  )
}
