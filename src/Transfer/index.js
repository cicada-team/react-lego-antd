import React from 'react'
import PropTypes from 'prop-types'
import { Transfer } from 'antd'
import {
  keep,
} from '../common'

/*
 props
 */
export const defaultState = {
  dataSource: [],
  titles: [],
  targetKeys: [],
  selectedKeys: [],
  operations: [],
  showSearch: false,
  searchPlaceholder: '请输入搜索内容',
  notFoundContent: '列表为空',
}

export const stateTypes = {
  dataSource: PropTypes.array,
  titles: PropTypes.array,
  targetKeys: PropTypes.array,
  selectedKeys: PropTypes.array,
  operations: PropTypes.array,
  showSearch: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  notFoundContent: PropTypes.string,
}

/*
 reduce functions
 */
export const defaultListeners = {
  onSelectChange({ state }, sourceSelectedKeys, targetSelectedKeys) {
    return {
      ...state,
      selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys],
    }
  },
  onChange({ state }, nextTargetKeys) {
    return {
      ...state,
      targetKeys: nextTargetKeys,
    }
  },
  onSearchChange: keep,
}

export const interceptors = ['filterOption']

/*
 render
 */
export function render({ state, listeners, interceptors: finalInterceptors }) {
  return (<Transfer
    render={item => item.title}
    {...finalInterceptors}
    {...state}
    {...listeners}
  />)
}
