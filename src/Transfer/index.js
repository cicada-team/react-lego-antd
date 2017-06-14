import React from 'react'
import PropTypes from 'prop-types'
import { Transfer } from 'antd'
import {
  noop,
} from '../common'

export const getDefaultState = () => ({
  dataSource: [],
  titles: [],
  targetKeys: [],
  selectedKeys: [],
  operations: [],
  showSearch: false,
  searchPlaceholder: '请输入搜索内容',
  notFoundContent: '列表为空',
})

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

export const defaultListeners = {
  onSelectChange(_, sourceSelectedKeys, targetSelectedKeys) {
    return {
      selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys],
    }
  },
  onChange(_, nextTargetKeys) {
    return {
      targetKeys: nextTargetKeys,
    }
  },
  onSearchChange: noop,
}

export const defaultIntercepters = { filterOption: undefined }

export function render({ state, listeners, intercepters: finalIntercepters }) {
  return (<Transfer
    render={item => item.title}
    {...finalIntercepters}
    {...state}
    {...listeners}
  />)
}
