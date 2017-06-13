import React from 'react'
import PropTypes from 'prop-types'
import { Progress } from 'antd'
import { pick } from '../util'

const LIST_TYPES = ['line', 'circle', 'dashboard']
const LIST_STATUS = ['default', 'success', 'active', 'exception']

export const getDefaultState = () => ({
  type: LIST_TYPES[0],
  percent: 0,
  format: undefined,
  status: LIST_STATUS[0],
  width: 132,
  strokeWidth: null,
  showInfo: true,
})

export const stateTypes = {
  type: PropTypes.oneOf(LIST_TYPES),
  percent: PropTypes.number,
  format: PropTypes.func,
  status: PropTypes.oneOf(LIST_STATUS),
  width: PropTypes.number,
  strokeWidth: PropTypes.number,
  showInfo: PropTypes.bool,
}

export function render({ state }) {
  const props = pick(state, ['type', 'percent', 'format', 'status', 'width', 'strokeWidth', 'showInfo'])
  if (props.status === LIST_STATUS[0]) {
    delete props.status
  }
  return <Progress {...props} />
}
