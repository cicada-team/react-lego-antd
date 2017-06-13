import React from 'react'
import PropTypes from 'prop-types'
import { Spin } from 'antd'
import {
  SIZES,
} from '../common'

export const getDefaultState = () => ({
  spinning: false,
  size: SIZES[0],
  tip: '',
  delay: undefined,
})

export const stateTypes = {
  spinning: PropTypes.bool,
  size: PropTypes.oneOf(SIZES),
  tip: PropTypes.string,
  delay: PropTypes.number,
}

export function render({ state, children }) {
  return <Spin {...state} >{children}</Spin>
}
